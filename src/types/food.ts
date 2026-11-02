export type FoodCategory = //定义大类
  | "hotpot" //锅物和麻辣烫类
  | "noodle" //粉面汤水类
  | "rice" //盖饭和中式快餐
  | "fastfood" //西式快餐和炸物
  | "snack" //街头小吃和地方风味
  | "bbq" //烧烤和夜宵江湖菜
  | "porridge" //温和养胃和粥品
  | "light"; //轻食和甜品

export type Temperature = "hot" | "warm" | "cool" | "cold"; //食物本身温度（如"hotpot"对应"hot","iceCream"对应"cold")
//烫/温热/凉/冰
export type MealTime = "breakfast" | "lunch" | "tea" | "dinner" | "supper"; //食物适合哪一餐（如"baoZi"适合"breakfast","cake"适合"tea"）
//早餐/午餐/下午茶/晚餐/夜宵
export type MoodTag = "stressed" | "tired" | "reward" | "casual"; //食物契合哪种心情（如"friedChicken"契合"stressed"）
//高压/疲惫/愉悦/平常
export type Flavor = "spicy" | "savory" | "sour" | "mild"; //食物的口味（如"maLaTang"契合"spicy"）
//辣/咸鲜/酸爽/清甜
export type Texture = "soup" | "dry" | "crispy" | "soft"; //食物的口感（如"noodles"属于"soup"）
//汤水/干噎/酥脆/软糯
export type Scale = "snack" | "simple" | "hearty" | "feast"; //食物的规格（如"steak"适于"hearty"）
//小吃/简餐/正餐/大餐
export interface FoodItem {
  name: string; //食物名称（用于在地图中搜索的标识符）
  category: FoodCategory; // 所属大类
  visual: {
    image: string; //食物图片链接
    description: string; //食物的一句描述
  };
  temperature: Temperature[]; //"[]"代表可能有多种值
  mealTime: MealTime[];
  moodTags: MoodTag[];
  flavor: Flavor[];
  texture: Texture[];
  scale: Scale[];
}
