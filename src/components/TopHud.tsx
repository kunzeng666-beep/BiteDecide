import { useEffect, useState } from 'react';
import {
  fetchEnvironmentContext,
  getCurrentMealTime,
  getWeatherEmoji,
  type EnvironmentContextData,
} from '../utils/amapWeather';

interface TopHudProps {
  visible: boolean;
  onEnvLoaded?: (env: EnvironmentContextData) => void;
}

export default function TopHud({ visible, onEnvLoaded }: TopHudProps) {
  const [timeStr, setTimeStr] = useState<string>(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;
  });

  const [envData, setEnvData] = useState<EnvironmentContextData>(() => {
    const { mealTime, label } = getCurrentMealTime();
    return {
      city: '定位中...',
      adcode: '110000',
      coords: null,
      weather: '晴',
      temperature: 20,
      tempTag: 'hot',
      mealTime,
      mealTimeLabel: label,
      isLiveApi: false,
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(
        `${String(now.getHours()).padStart(2, '0')}:${String(
          now.getMinutes()
        ).padStart(2, '0')}`
      );
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;
    fetchEnvironmentContext().then((data) => {
      if (!active) return;
      setEnvData(data);
      onEnvLoaded?.(data);
    });
    return () => {
      active = false;
    };
  }, [onEnvLoaded]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 px-7 py-5 flex items-start justify-between pointer-events-none transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-5 pointer-events-none'
      }`}
    >
      {/* 左上角：地点、时间、天气手绘胶囊 */}
      <div className="sketch-box pointer-events-auto inline-flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#3b2314]">
        <span>📍 {envData.city}</span>
        <div className="w-0.5 h-3.5 bg-[#3b2314]/20 rounded" />
        <span className="font-mono">{timeStr}</span>
        <span className="bg-[#fde68a] border-2 border-[#3b2314] px-2 py-0.5 rounded-lg text-xs">
          {envData.mealTimeLabel}
        </span>
        <div className="w-0.5 h-3.5 bg-[#3b2314]/20 rounded" />
        <span>
          {getWeatherEmoji(envData.weather)} {envData.weather}{' '}
          {envData.temperature}°C
        </span>
      </div>

      {/* 正上方：一锤定食 Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 top-4 flex flex-col items-center pointer-events-auto">
        <div className="bg-[#fffbeb] border-[3.5px] border-[#3b2314] shadow-[5px_5px_0px_#3b2314] px-6 py-2 rounded-3xl flex items-center gap-2.5">
          <span className="text-2xl">🔨</span>
          <span className="text-2xl md:text-[28px] font-black tracking-wider text-[#3b2314]">
            一锤定食
          </span>
        </div>
        <span className="mt-1.5 bg-[#3b2314] text-[#fff8eb] text-[11px] font-extrabold px-3 py-0.5 rounded-full tracking-widest">
          BITE DECIDE · 今天吃什么
        </span>
      </div>

      <div className="w-28" />
    </header>
  );
}
