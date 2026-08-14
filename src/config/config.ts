const designImages = import.meta.glob('/src/pages-design/static/images/*', {
    eager: true,
    import: 'default'
}) as Record<string, string>
export const designImage = (path: string) => {
    // #ifndef H5 || APP-PLUS
    return `/pages-design/static/images/${path}`
    // #endif

    // #ifdef H5 || APP-PLUS
    return designImages[`/src/pages-design/static/images/${path}`]
    // #endif
}

export const config = {
    image: designImage('good_7.jpg'),
    avatar: designImage('avatar.jpg'),
    food: designImage('food_1.jpg'),
    good: designImage,
    logo: designImage('logo.png'),
    url: 'https://h5.hy-design-uni.top',
    swiper1: designImage('swiper_1.png'),
    swiper2: designImage('swiper_2.png'),
    swiper3: designImage('swiper_3.png'),
    qq: designImage('qq.jpg'),
    wx: designImage('wx.jpg'),
    wb: designImage('wb.jpg'),
    sc: designImage('sc.jpg')
}
