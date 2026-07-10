declare namespace Calendar {
    /** 返回农历y年一整年的总天数 */
    function lYearDays(y: number): number
    /** 返回农历y年闰月是哪个月；若y年没有闰月 则返回0 */
    function leapMonth(y: number): number
    /** 返回农历y年闰月的天数 若该年没有闰月则返回0 */
    function leapDays(y: number): number
    /** 返回农历y年m月（非闰月）的总天数 */
    function monthDays(y: number, m: number): number
    /** 返回公历y年m月的天数 */
    function solarDays(y: number, m: number): number
    /** 农历年份转换为干支纪年 */
    function toGanZhiYear(lYear: number): string
    /** 公历月、日判断所属星座 */
    function toAstro(cMonth: number, cDay: number): string
    /** 传入offset偏移量返回干支 */
    function toGanZhi(offset: number): string
    /** 传入公历年获得该年第n个节气的公历日期 */
    function getTerm(y: number, n: number): number
    /** 传入农历数字月份返回汉语通俗表示法 */
    function toChinaMonth(m: number): string
    /** 传入农历日期数字返回汉字表示法 */
    function toChinaDay(d: number): string
    /** 年份转生肖 */
    function getAnimal(y: number): string
    /** 传入阳历年月日获得详细的公历、农历信息 */
    function solar2lunar(y: number, m: number, d: number): CalendarResult
    /** 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历信息 */
    function lunar2solar(y: number, m: number, d: number, isLeapMonth?: boolean): CalendarResult
}

interface CalendarResult {
    lYear: number
    lMonth: number
    lDay: number
    Animal: string
    IMonthCn: string
    IDayCn: string
    cYear: number
    cMonth: number
    cDay: number
    gzYear: string
    gzMonth: string
    gzDay: string
    isToday: boolean
    isLeap: boolean
    nWeek: number
    ncWeek: string
    isTerm: boolean
    Term: string | null
    astro: string
}

export { Calendar }
