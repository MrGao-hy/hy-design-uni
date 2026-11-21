/**
 * hy-rich-text 瀵屾枃鏈�粍浠剁被鍨嬪０鏄?
 * 鍩轰簬 mp-html v2.5.2 瑙ｆ瀽鍣?+ 鍘熺敓 rich-text 娓叉煋
 * 锛坔ttps://github.com/jin-yufeng/mp-html锛?
 */
export interface HyRichTextProps {
    /**
     * @description 瀹瑰櫒鐨勬牱寮?
     */
    containerStyle?: string
    /**
     * @description 鐢ㄤ簬娓叉煋鐨?html 瀛楃�涓?
     */
    content?: string
    /**
     * @description 涓诲煙鍚嶏紝鐢ㄤ簬鎷兼帴閾炬帴
     */
    domain?: string
    /**
     * @description 鏄�惁寮€鍚�暱鎸夊�鍒讹紙浼犲叆 'force' 鍙�湪 iOS 寮哄埗寮€鍚�級
     */
    selectable?: boolean | string
    /**
     * @description 鏄�惁灏?title 鏍囩�鐨勫唴瀹硅�缃�埌椤甸潰鏍囬�
     */
    setTitle?: boolean | string
    /**
     * @description 鏍囩�鐨勯粯璁ゆ牱寮?
     */
    tagStyle?: Record<string, string>
    /**
     * @description 鑷�畾涔夊�閮ㄧ被鍚?
     */
    customClass?: string
    /**
     * @description 瀹氫箟闇€瑕佺敤鍒扮殑澶栭儴鏍峰紡
     */
    customStyle?: string | Record<string, string>
}

/** 鍐呭�澶у皬鍜屼綅缃?*/
export interface HyRichTextRect {
    left: number
    right: number
    top: number
    bottom: number
    width: number
    height: number
}

/**
 * @description 缁勪欢浜嬩欢澹版槑
 */
export interface HyRichTextEmits {
    /** dom 缁撴瀯鍔犺浇瀹屾瘯鏃惰Е鍙?*/
    onLoad: () => void
    /** 娓叉煋楂樺害绋冲畾鍚庤Е鍙戯紙350ms 鍐呴珮搴︽棤鍙樺寲锛?*/
    onReady: (rect: Partial<HyRichTextRect>) => void
    /** 瀹瑰櫒琚�偣鍑绘椂瑙﹀彂 */
    onTap: () => void
    /** 瀹瑰櫒琚�偣鍑绘椂瑙﹀彂 */
    onClick: () => void
}

/**
 * @description 閫氳繃 ref 鏆撮湶鐨勫疄渚嬫柟娉?
 */
export interface HyRichTextInstance {
    /**
     * 璁剧疆鍐呭�
     * @param content html 鍐呭�
     * @param append 鏄�惁鍦ㄥ熬閮ㄨ拷鍔?
     */
    setContent: (content: string, append?: boolean) => void
    /** 鑾峰彇鏂囨湰鍐呭� */
    getText: (nodes?: any[]) => string
    /** 鑾峰彇鍐呭�澶у皬鍜屼綅缃?*/
    getRect: () => Promise<HyRichTextRect>
}
