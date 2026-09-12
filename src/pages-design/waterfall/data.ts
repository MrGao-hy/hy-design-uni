import { designImage } from '@/config/config.ts'

/**
 * 瀑布流演示数据
 * @param t 翻译函数（由页面传入，语言切换后重新生成文案）
 */
export default (t: Function) => [
    {
        price: t('price1'),
        title: t('title1'),
        shop: t('shop1'),
        image: designImage('good_1.jpg')
    },
    {
        price: t('price2'),
        title: t('title2'),
        shop: t('shop1'),
        image: designImage('good_2.jpg')
    },
    {
        price: t('price3'),
        title: t('title3'),
        shop: t('shop2'),
        image: designImage('good_3.jpg')
    },
    {
        price: t('price4'),
        title: t('title4'),
        shop: t('shop3'),
        image: designImage('good_4.jpg')
    },
    {
        price: t('price5'),
        title: t('title5'),
        shop: t('shop4'),
        image: designImage('good_5.jpg')
    },
    {
        price: t('price6'),
        shop: t('shop5'),
        title: t('title6'),
        image: designImage('good_6.jpg')
    },
    {
        price: t('price7'),
        shop: t('shop6'),
        title: t('title7'),
        image: designImage('good_7.jpg')
    },
    {
        price: t('price8'),
        title: t('title8'),
        shop: t('shop4'),
        image: designImage('good_8.jpg')
    },
    {
        price: t('price9'),
        title: t('title9'),
        shop: t('shop4'),
        image: designImage('good_9.jpg')
    },
    {
        price: t('price10'),
        title: t('title10'),
        shop: t('shop4'),
        image: designImage('good_10.jpg')
    },
    {
        price: t('price11'),
        title: t('title11'),
        shop: t('shop7'),
        image: designImage('good_11.jpg')
    }
]
