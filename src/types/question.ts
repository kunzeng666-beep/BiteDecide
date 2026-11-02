// 1. 引入问题所针对的四个属性
import type { MoodTag, Flavor, Texture, Scale } from "./food";

// 2. 定义问题考察的四个维度名称，与 foodItem 的四个属性对应
export type QuestionDimension = "moodTags" | "flavor" | "texture" | "scale";

// 3. 选项背后对应的倾向值
export type AnswerValue = MoodTag | Flavor | Texture | Scale;

// 4. 单个选项的结构
export interface QuestionOption {
  label: string; // 展示给用户看的选项文字（如:"压力山大"）
  image: string; // 展示给用户的选项图片**链接**
  value: AnswerValue; // 对应的底层属性值（如："stressed"）
}

// 5. 一道完整问题的数据结构
export interface Question {
  id: string; // 题目唯一key（如："mood_1"）
  dimension: QuestionDimension; // 这道题属于哪一类问题库
  prompt: string; // 题干文字（如："此时此刻，你的身心状态更接近？"）
  options: QuestionOption[]; // 四个选项组成的列表
}
