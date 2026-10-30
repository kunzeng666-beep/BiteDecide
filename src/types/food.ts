export type FoodCategory =
    | "hotpot"      //锅物和麻辣烫类
    | "noodle"      //粉面汤水类
    | "rice"        //盖饭和中式快餐
    | "fastfood"    //西式快餐和炸物
    | "snack"       //街头小吃和地方风味
    | "bbq"         //烧烤和夜宵江湖菜
    | "porridge"    //温和养胃和粥品
    | "light"       //轻食和甜品

export type Temperature = "hot" | "warm" | "cool" | "cold"

export type MealTime = "breakfast" | "lunch" | "tea" | "dinner" | "supper"

export type MoodTag = "stressed" | "tired" | "reward" | "casual"

export type Flavor = "spicy" | "savory" | "sour" | "mild"

export type Texture = "soup" | "dry" | "crispy" | "soft"

export type Scale = "snack" | "simple" | "hearty" | "feast"

export interface FoodItem {
    name: string
    category: FoodCategory
    visual: {
        image: string       //食物图片链接
        description: string
    }
    temperature: Temperature[]   //"[]"代表可能有多种值
    mealTime: MealTime[]
    moodTags: MoodTag[]
    flavor: Flavor[]
    texture: Texture[]
    scale: Scale[]
}