import type { Question } from "../types/question"

export const QUESTION_BANK: Question[] = [
    // ================= 1. moodTags（情绪状态维度：共 3 题）=================
    {
        id: "mood_1",
        dimension: "moodTags",
        prompt: "此时此刻，你的身心状态更接近哪张图？",
        options: [
            {
                label: "压力山大",
                image: "/images/questions/mood1_stressed.jpg", // 画面：男人抱着头显露出痛苦抓狂的表情
                value: "stressed",
            },
            {
                label: "电量不足",
                image: "/images/questions/mood1_tired.jpg",    // 画面：一个人毫无生气地瘫倒在沙发上
                value: "tired",
            },
            {
                label: "喜出望外",
                image: "/images/questions/mood1_reward.jpg",   // 画面：一个开怀大笑、充满活力的男孩
                value: "reward",
            },
            {
                label: "稀松平常",
                image: "/images/questions/mood1_casual.jpg",   // 画面：一个神情平静、淡淡微笑的人
                value: "casual",
            },
        ],
    },
    {
        id: "mood_2",
        dimension: "moodTags",
        prompt: "如果用一只小动物代表现在的你，会是哪个？",
        options: [
            {
                label: "抓狂炸毛",
                image: "/images/questions/mood2_stressed.jpg", // 画面：对着电脑屏幕炸毛咆哮的猫咪
                value: "stressed",
            },
            {
                label: "累成液体",
                image: "/images/questions/mood2_tired.jpg",    // 画面：像液体一样融化趴在地板上的小狗
                value: "tired",
            },
            {
                label: "快乐转圈",
                image: "/images/questions/mood2_reward.jpg",   // 画面：举着小彩旗欢呼雀跃的小熊
                value: "reward",
            },
            {
                label: "佛系发呆",
                image: "/images/questions/mood2_casual.jpg",   // 画面：顶着橘子安详发呆的水豚（卡皮巴拉）
                value: "casual",
            },
        ],
    },
    {
        id: "mood_3",
        dimension: "moodTags",
        prompt: "如果把你现在的心情比作一种天气画面，会是哪张？",
        options: [
            {
                label: "电闪雷鸣",
                image: "/images/questions/mood3_stressed.jpg", // 画面：乌云密布、闪电劈下的狂暴雷雨天
                value: "stressed",
            },
            {
                label: "阴雨绵绵",
                image: "/images/questions/mood3_tired.jpg",    // 画面：窗玻璃滑落雨滴、灰蒙蒙想睡觉的雨天
                value: "tired",
            },
            {
                label: "绚丽彩虹",
                image: "/images/questions/mood3_reward.jpg",   // 画面：阳光灿烂、天空挂着绚丽彩虹的明媚画面
                value: "reward",
            },
            {
                label: "微风晴朗",
                image: "/images/questions/mood3_casual.jpg",   // 画面：蓝天白云、微风吹拂树叶的平静晴天
                value: "casual",
            },
        ],
    },

    // ================= 2. flavor（味道类型维度：共 3 题）=================
    {
        id: "flavor_1",
        dimension: "flavor",
        prompt: "凭第一眼直觉，哪种汤汁色泽最让你咽口水？",
        options: [
            {
                label: "红油沸腾",
                image: "/images/questions/flavor1_spicy.jpg",  // 画面：红亮辣椒油在锅中翻滚冒泡特写
                value: "spicy",
            },
            {
                label: "浓油赤酱",
                image: "/images/questions/flavor1_savory.jpg", // 画面：色泽琥珀醇厚的红烧卤汁/浓高汤
                value: "savory",
            },
            {
                label: "酸爽开胃",
                image: "/images/questions/flavor1_sour.jpg",   // 画面：金黄番茄汤配新鲜青柠片与酸汤
                value: "sour",
            },
            {
                label: "清淡柔和",
                image: "/images/questions/flavor1_mild.jpg",   // 画面：奶白清澈的鲜汤配翠绿葱花
                value: "mild",
            },
        ],
    },
    {
        id: "flavor_2",
        dimension: "flavor",
        prompt: "桌上有四碟灵魂调料，你的筷子最想蘸哪碟？",
        options: [
            {
                label: "火辣红油",
                image: "/images/questions/flavor2_spicy.jpg",  // 画面：装满小米辣与红油的蘸水碗
                value: "spicy",
            },
            {
                label: "醇香酱卤",
                image: "/images/questions/flavor2_savory.jpg", // 画面：蒜蓉、沙茶酱与鲜酱油碟
                value: "savory",
            },
            {
                label: "酸甜糖醋",
                image: "/images/questions/flavor2_sour.jpg",   // 画面：晶莹剔透的酸梅酱/番茄糖醋汁
                value: "sour",
            },
            {
                label: "原汁原味",
                image: "/images/questions/flavor2_mild.jpg",   // 画面：清爽柠檬海盐与清汤本味
                value: "mild",
            },
        ],
    },
    {
        id: "flavor_3",
        dimension: "flavor",
        prompt: "路过美食街，哪种味觉冲击画面最能把你勾进店里？",
        options: [
            {
                label: "麻辣鲜香",
                image: "/images/questions/flavor3_spicy.jpg",  // 画面：铺满干辣椒与花椒、热油浇淋瞬间
                value: "spicy",
            },
            {
                label: "卤香四溢",
                image: "/images/questions/flavor3_savory.jpg", // 画面：刚出锅泛着誘人油光的酱肉卤味特写
                value: "savory",
            },
            {
                label: "果酸清爽",
                image: "/images/questions/flavor3_sour.jpg",   // 画面：挂着水珠的青柠百香果与酸辣凉拌特写
                value: "sour",
            },
            {
                label: "奶香清甜",
                image: "/images/questions/flavor3_mild.jpg",   // 画面：散发柔和热气的鲜奶、椰汁与清炖盅
                value: "mild",
            },
        ],
    },

    // ================= 3. texture（口感形态维度：共 3 题）=================
    {
        id: "texture_1",
        dimension: "texture",
        prompt: "饭菜端上桌的第一口，你最想享受哪种口感？",
        options: [
            {
                label: "热汤嗦粉",
                image: "/images/questions/texture1_soup.jpg",   // 画面：筷子夹起挂满热汤的粉面，热气腾腾
                value: "soup",
            },
            {
                label: "酱汁拌饭",
                image: "/images/questions/texture1_dry.jpg",    // 画面：勺子挖起裹满浓郁菜汁的米饭
                value: "dry",
            },
            {
                label: "咔滋酥脆",
                image: "/images/questions/texture1_crispy.jpg", // 画面：刚出锅金黄掉渣的酥脆炸鸡外皮
                value: "crispy",
            },
            {
                label: "绵密软糯",
                image: "/images/questions/texture1_soft.jpg",   // 画面：温润绵稠的砂锅粥与软糯蒸点
                value: "soft",
            },
        ],
    },
    {
        id: "texture_2",
        dimension: "texture",
        prompt: "此刻哪种烹饪画面最能唤醒你的胃口？",
        options: [
            {
                label: "高汤慢炖",
                image: "/images/questions/texture2_soup.jpg",   // 画面：砂锅里咕嘟咕嘟炖煮的鲜汤锅物
                value: "soup",
            },
            {
                label: "猛火快炒",
                image: "/images/questions/texture2_dry.jpg",    // 画面：铁锅大火颠勺、锅气十足的小炒干拌
                value: "dry",
            },
            {
                label: "金黄煎炸",
                image: "/images/questions/texture2_crispy.jpg", // 画面：铁板上滋滋冒油、外焦里嫩的烤炸物
                value: "crispy",
            },
            {
                label: "清爽轻盈",
                image: "/images/questions/texture2_soft.jpg",   // 画面：色彩鲜亮、软嫩无负担的轻食与粥品
                value: "soft",
            },
        ],
    },
    {
        id: "texture_3",
        dimension: "texture",
        prompt: "现在给你递一副餐具，你最想用它做哪个动作？",
        options: [
            {
                label: "大勺喝汤",
                image: "/images/questions/texture3_soup.jpg",   // 画面：瓷勺盛起一勺鲜美滚烫的高汤与滑嫩食材
                value: "soup",
            },
            {
                label: "快筷干拌",
                image: "/images/questions/texture3_dry.jpg",    // 画面：筷子飞快搅拌裹满浓郁肉酱的拌面/盖饭
                value: "dry",
            },
            {
                label: "大口咬脆",
                image: "/images/questions/texture3_crispy.jpg", // 画面：双手拿着金黄酥脆的炸鸡腿/汉堡大口咬下
                value: "crispy",
            },
            {
                label: "小勺抿软",
                image: "/images/questions/texture3_soft.jpg",   // 画面：小勺轻轻舀起入口即化的热粥或甜品
                value: "soft",
            },
        ],
    },

    // ================= 4. scale（就餐规格维度：共 3 题）=================
    {
        id: "scale_1",
        dimension: "scale",
        prompt: "摸摸现在的肚子，这顿饭准备摆多大阵仗？",
        options: [
            {
                label: "解馋小吃",
                image: "/images/questions/scale1_snack.jpg",  // 画面：手拿一份精致街头小吃/点心小碗
                value: "snack",
            },
            {
                label: "一人简餐",
                image: "/images/questions/scale1_simple.jpg", // 画面：干净利落的一碗招牌粉面或快手盖饭
                value: "simple",
            },
            {
                label: "丰盛正餐",
                image: "/images/questions/scale1_hearty.jpg", // 画面：有肉有菜有汤的丰盛一人/双人套餐托盘
                value: "hearty",
            },
            {
                label: "豪华大餐",
                image: "/images/questions/scale1_feast.jpg",  // 画面：摆满肥牛、海鲜与烤肉的丰盛大桌盛宴
                value: "feast",
            },
        ],
    },
    {
        id: "scale_2",
        dimension: "scale",
        prompt: "你现在的饥饿程度是哪一档？",
        options: [
            {
                label: "轻微嘴馋",
                image: "/images/questions/scale2_snack.jpg",  // 画面：小猫咪轻轻舔嘴唇，只想吃点小零嘴
                value: "snack",
            },
            {
                label: "正常干饭",
                image: "/images/questions/scale2_simple.jpg", // 画面：端起饭碗准备日常干饭的状态
                value: "simple",
            },
            {
                label: "饥肠辘辘",
                image: "/images/questions/scale2_hearty.jpg", // 画面：肚子咕咕叫，渴望大碗硬菜与肉食
                value: "hearty",
            },
            {
                label: "饿吞巨象",
                image: "/images/questions/scale2_feast.jpg",  // 画面：恨不得吃下一整桌满汉全席的夸张画面
                value: "feast",
            },
        ],
    },
    {
        id: "scale_3",
        dimension: "scale",
        prompt: "此刻你理想中的干饭桌面长什么样？",
        options: [
            {
                label: "随手小食",
                image: "/images/questions/scale3_snack.jpg",  // 画面：边走边拿在手里的纸盒小吃与精致甜点
                value: "snack",
            },
            {
                label: "快手一碗",
                image: "/images/questions/scale3_simple.jpg", // 画面：书桌或餐盘上干净利落的一碗热面/盖饭
                value: "simple",
            },
            {
                label: "有荤有素",
                image: "/images/questions/scale3_hearty.jpg", // 画面：摆着主菜、配菜、例汤与米饭的丰盛餐盘
                value: "hearty",
            },
            {
                label: "满桌硬菜",
                image: "/images/questions/scale3_feast.jpg",  // 画面：火锅烤盘居中、周围摆满肉盘的大餐桌
                value: "feast",
            },
        ],
    },
]
