import { config } from '@/config/config.ts'

// 所有分类共用的演示菜品 key
const dishKeys = [
    'dishMushroom',
    'dishBeefMushroom',
    'dishFishFlavor',
    'dishEggplant',
    'dishPork',
    'dishPigFeet'
]

// 菜单分类 key
const catKeys = [
    'catRice',
    'catStirFry',
    'catNoodle',
    'catBurger',
    'catDrink',
    'catDumpling',
    'catSnack',
    'catChinese',
    'catWestern',
    'catFeast'
]

// 生成菜单演示数据（接收翻译函数以支持国际化）
export const getData = (t: (key: string) => string) =>
    catKeys.map((cat, index) => ({
        id: index + 1,
        name: t(cat),
        children: dishKeys.map((dish, dIndex) => ({
            key: `${index + 1}-${dIndex + 1}`,
            name: t(dish),
            url: config.food
        }))
    }))
