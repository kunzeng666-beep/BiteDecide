import type { MealTime, Temperature } from '../types/food';

export interface GeoCoords {
  lng: number;
  lat: number;
}

export interface EnvironmentContextData {
  city: string;
  adcode: string;
  coords: GeoCoords | null; // 精确或城市中心经纬度，供后续高德周边餐厅检索计算距离使用
  weather: string;
  temperature: number;
  tempTag: Temperature; // 食物温度加权倾向
  mealTime: MealTime;
  mealTimeLabel: string;
  isLiveApi: boolean;
}

/**
 * 根据当前小时判断用餐时段（对应 SRS FR-00）
 */
export function getCurrentMealTime(date = new Date()): {
  mealTime: MealTime;
  label: string;
} {
  const hour = date.getHours();
  if (hour >= 6 && hour < 10) {
    return { mealTime: 'breakfast', label: '早餐' };
  }
  if (hour >= 10 && hour < 14) {
    return { mealTime: 'lunch', label: '午餐' };
  }
  if (hour >= 14 && hour < 17) {
    return { mealTime: 'tea', label: '下午茶' };
  }
  if (hour >= 17 && hour < 21) {
    return { mealTime: 'dinner', label: '晚餐' };
  }
  return { mealTime: 'supper', label: '夜宵' };
}

/**
 * 根据气温判断食物温度偏好倾向
 */
export function getTempPreference(tempCelsius: number): Temperature {
  return tempCelsius >= 26 ? 'cool' : 'hot';
}

/**
 * 根据高德天气描述匹配对应天气图标
 */
export function getWeatherEmoji(weather: string): string {
  if (weather.includes('雷')) return '⛈️';
  if (weather.includes('雨')) return '🌧️';
  if (weather.includes('雪')) return '❄️';
  if (weather.includes('阴')) return '☁️';
  if (weather.includes('云')) return '⛅';
  if (weather.includes('雾') || weather.includes('霾')) return '🌫️';
  if (weather.includes('风') || weather.includes('沙')) return '💨';
  return '☀️';
}

/**
 * 尝试通过浏览器 Geolocation API 获取精确经纬度（超时时间 4 秒）
 */
function getBrowserCoordinates(): Promise<GeoCoords | null> {
  return new Promise((resolve) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lng: Number(pos.coords.longitude.toFixed(6)),
          lat: Number(pos.coords.latitude.toFixed(6)),
        });
      },
      () => {
        // 用户拒绝授权或定位失败时返回 null，交由高德 IP 定位兜底
        resolve(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 4000,
        maximumAge: 300000, // 缓存 5 分钟
      }
    );
  });
}

/**
 * 从高德 IP 定位返回的 rectangle ("108.77,34.11;109.12,34.45") 中估算城市中心经纬度
 */
function parseRectangleCenter(rectangle: unknown): GeoCoords | null {
  if (typeof rectangle !== 'string' || !rectangle.includes(';')) return null;
  const parts = rectangle.split(';');
  const [lng1, lat1] = parts[0].split(',').map(Number);
  const [lng2, lat2] = parts[1].split(',').map(Number);
  if ([lng1, lat1, lng2, lat2].some(Number.isNaN)) return null;
  return {
    lng: Number(((lng1 + lng2) / 2).toFixed(6)),
    lat: Number(((lat1 + lat2) / 2).toFixed(6)),
  };
}

/**
 * 获取完整环境数据：
 * 1. 优先尝试浏览器精准经纬度 + 高德逆地理编码（获取城市/区县与 adcode）
 * 2. 若拒绝定位或超时，自动降级为高德 IP 定位
 * 3. 使用获取到的 adcode 请求高德实时天气接口
 */
export async function fetchEnvironmentContext(): Promise<EnvironmentContextData> {
  const { mealTime, label: mealTimeLabel } = getCurrentMealTime();
  const apiKey = (import.meta.env.VITE_AMAP_KEY as string | undefined)?.trim();

  // 未配置 Key 时的默认展示
  if (!apiKey) {
    const fallbackTemp = 20;
    return {
      city: '待配置Key',
      adcode: '110000',
      coords: null,
      weather: '晴',
      temperature: fallbackTemp,
      tempTag: getTempPreference(fallbackTemp),
      mealTime,
      mealTimeLabel,
      isLiveApi: false,
    };
  }

  let resolvedCity = '';
  let resolvedAdcode = '';
  let resolvedCoords: GeoCoords | null = null;

  try {
    // 第一优先级：浏览器精准经纬度 + 高德逆地理编码
    const gpsCoords = await getBrowserCoordinates();
    if (gpsCoords) {
      resolvedCoords = gpsCoords;
      const regeoUrl = `https://restapi.amap.com/v3/geocode/regeo?key=${encodeURIComponent(
        apiKey
      )}&location=${gpsCoords.lng},${gpsCoords.lat}&extensions=base`;

      const regeoRes = await fetch(regeoUrl);
      const regeoData = await regeoRes.json();
      const comp = regeoData?.regeocode?.addressComponent;

      if (comp) {
        const cityStr =
          typeof comp.city === 'string' && comp.city.length > 0
            ? comp.city
            : typeof comp.province === 'string'
              ? comp.province
              : '';
        const districtStr =
          typeof comp.district === 'string' && comp.district.length > 0
            ? comp.district
            : '';

        resolvedCity =
          cityStr && districtStr
            ? `${cityStr.replace(/市$/, '')}·${districtStr}`
            : cityStr || districtStr;
        resolvedAdcode =
          typeof comp.adcode === 'string' ? comp.adcode : '';
      }
    }

    // 第二优先级（自动降级）：若未拿到精准坐标或逆地理编码失败，使用高德 IP 定位
    if (!resolvedAdcode) {
      const ipRes = await fetch(
        `https://restapi.amap.com/v3/ip?key=${encodeURIComponent(apiKey)}`
      );
      const ipData = await ipRes.json();

      if (typeof ipData.adcode === 'string' && ipData.adcode.length > 0) {
        resolvedAdcode = ipData.adcode;
      }
      if (typeof ipData.city === 'string' && ipData.city.length > 0) {
        resolvedCity = ipData.city;
      } else if (
        typeof ipData.province === 'string' &&
        ipData.province.length > 0
      ) {
        resolvedCity = ipData.province;
      }

      if (!resolvedCoords) {
        resolvedCoords = parseRectangleCenter(ipData.rectangle);
      }
    }

    // 保底城市编码（北京市）
    if (!resolvedAdcode) {
      resolvedAdcode = '110000';
    }
    if (!resolvedCity) {
      resolvedCity = '北京市';
    }

    // 3. 根据 adcode 请求高德实况天气 API
    const weatherRes = await fetch(
      `https://restapi.amap.com/v3/weather/weatherInfo?key=${encodeURIComponent(
        apiKey
      )}&city=${encodeURIComponent(resolvedAdcode)}&extensions=base`
    );
    const weatherData = await weatherRes.json();
    const live = weatherData?.lives?.[0];

    if (live) {
      const parsedTemp = Number.parseInt(live.temperature, 10);
      const temperature = Number.isNaN(parsedTemp) ? 20 : parsedTemp;
      return {
        city: resolvedCity || live.city || '本地',
        adcode: resolvedAdcode,
        coords: resolvedCoords,
        weather: live.weather || '晴',
        temperature,
        tempTag: getTempPreference(temperature),
        mealTime,
        mealTimeLabel,
        isLiveApi: true,
      };
    }
  } catch (err) {
    console.warn('[BiteDecide] 高德定位/天气请求异常:', err);
  }

  return {
    city: resolvedCity || '定位失败',
    adcode: resolvedAdcode || '110000',
    coords: resolvedCoords,
    weather: '晴',
    temperature: 20,
    tempTag: 'hot',
    mealTime,
    mealTimeLabel,
    isLiveApi: false,
  };
}
