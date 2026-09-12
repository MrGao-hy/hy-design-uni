export default {
    mine: {
        vip: 'VIP',
        bio: '这个人很懒，什么都没有留下',
        components: '组件',
        following: '关注',
        followers: '粉丝',
        likes: '获赞',
        orders: '我的订单',
        address: '收货地址',
        messages: '我的消息',
        favorites: '我的收藏',
        settings: '设置',
        help: '帮助与反馈',
        about: '关于我们',
        language: '语言切换',
        logout: '退出登录',
        logoutConfirm: '确定要退出登录吗？',
        logoutTitle: '确认退出',
        logoutSuccess: '退出成功',
        logoutFail: '退出失败，请重试',
        pageNotExist: '页面不存在',
        langSwitch: '已切换为中文',
        langSwitchEn: 'Switched to English',
        harmonyTools: '鸿蒙审核工具'
    },

    // ============ pages-design 页面国际化 ============
    // 命名空间 = 页面目录名，每个 namespace 至少包含 title（对应 navigationBarTitleText）
    // 包含「页面标题 + 功能性交互文案 + 演示内容文案」；展示型数据在页面中用 computed 包裹 t() 以响应语言切换

    actionSheet: {
        title: '操作菜单',
        // 选项点击反馈（带变量）
        clicked: (name: string) => `点击了: ${name}`,
        clickedNoClose: (name: string) => `点击了: ${name} (不关闭)`,
        clickedCancel: '点击了取消',
        // ===== 演示内容 =====
        sectionBasic: '基础功能',
        sectionStatus: '选项状态',
        sectionPanel: '自定义面板',
        sectionAdvanced: '高级用法',
        basicUsage: '基础使用',
        withTitle: '带标题',
        withCancel: '带取消按钮',
        disabledState: '禁用状态',
        loadingState: '加载状态',
        customColor: '自定义颜色',
        withDescription: '描述信息',
        singlePanel: '单行面板',
        multiPanel: '多行面板',
        noCloseOnClick: '点击不关闭',
        customSlot: '自定义内容插槽',
        sheetTitle: '我是标题',
        cancelText: '取消',
        shareTo: '分享给',
        customContentTitle: '自定义内容',
        customContentText: '这里是自定义内容区域',
        confirmClose: '确认关闭',
        option: (n: number) => `选项${n}`,
        normalOption: '正常选项',
        disabledOption: '禁用选项',
        otherOption: '其他选项',
        loadingOption: '加载中...',
        normalText: '正常文字',
        redWarning: '红色警告',
        blueLink: '蓝色链接',
        desc1: '这是一段描述信息',
        desc2: '这是另一段描述',
        wechat: '微信',
        weibo: '微博',
        qq: 'QQ',
        favorite: '收藏',
        qqFriend: 'QQ好友',
        wechatFriend: '微信好友',
        moments: '朋友圈'
    },

    addressPicker: {
        title: '地址选择器',
        // ===== 演示内容 =====
        basicUsage: '基础使用',
        separator: '分割线'
    },

    avatar: {
        title: '头像',
        // ===== 演示内容 =====
        basicUsage: '基础使用',
        textAvatar: '文字头像',
        iconAvatar: '图标头像',
        differentSize: '不同大小',
        customColor: '自定义颜色',
        colorIndex: '指定颜色索引',
        avatarShape: '头像形状',
        customTextStyle: '自定义文字样式',
        clickEvent: '点击事件',
        surnameHu: '胡',
        surnameLi: '李',
        surnameSun: '孙',
        surnameWang: '王',
        colorRed: '红',
        colorGreen: '绿',
        colorBlue: '蓝',
        colorPurple: '紫',
        fontBig: '大',
        fontSmall: '小',
        fontWhite: '白',
        fontBlack: '黑',
        // 图片长按菜单
        sendToFriend: '发送给朋友',
        saveImage: '保存图片',
        favoriteImage: '收藏'
    },

    backTop: {
        title: '返回顶部',
        // ===== 演示内容 =====
        indicator: '指示点',
        duration: '回去时长',
        rightDistance: '距离右边距离',
        bottomDistance: '距离底部距离',
        shapeCircle: '圆形',
        shapeSquare: '方形'
    },

    badge: {
        title: '徽标数',
        // ===== 演示内容 =====
        shapeSection: '边角形状',
        displaySection: '显示方式',
        dotSection: '显示圆点',
        themeSection: '显示主题色',
        invertedSection: '反转色',
        absoluteSection: '相对定位'
    },

    button: {
        title: '按钮',
        // ===== 演示内容 =====
        basicButton: '基础按钮',
        buttonColor: '按钮颜色',
        plainButton: '按钮镂空',
        plainNoBorder: '按钮镂空（无边框）',
        buttonIcon: '按钮图标',
        loadingButton: '加载按钮',
        buttonSize: '按钮大小',
        buttonShape: '按钮形状',
        longText: '我是很长的按钮,按着我会触发惊喜哦',
        button: '按钮',
        defaultButton: '默认按钮',
        primaryButton: '主要按钮',
        infoButton: '信息按钮',
        dangerButton: '危险按钮',
        warningButton: '警告按钮',
        gradientButton: '渐变按钮',
        delete: '删除',
        submitting: '提交中...',
        largeButton: '大尺寸按钮',
        smallButton: '小尺寸按钮',
        miniButton: '迷你按钮',
        squareButton: '方形按钮',
        circleButton: '圆形按钮'
    },

    calendar: {
        title: '日历',
        // ===== 演示内容 =====
        demo: {
            single: '单个日期',
            multiple: '多个日期',
            range: '日期范围',
            themeColor: '自定义主题颜色',
            customText: '自定义文案',
            maxRange: '日期最大范围',
            lunar: '显示农历',
            defaultDate: '默认日期',
            rangeLimit: '日期范围限制',
            rangeLimit7: '范围选择限制（7天）',
            forbid: '禁用日期',
            readonly: '只读模式',
            multipleLimit: '多选限制数量',
            weekText: '自定义星期文案'
        },
        startText: '住店',
        endText: '离店',
        confirmDisabledText: '请选择离店日期',
        rangePrompt: '最多选择7天',
        forbidDaysToast: '该日期已被预约',
        discount: '有优惠'
    },

    card: {
        title: '卡片',
        // ===== 演示内容 =====
        basicUsage: '基础使用',
        showHead: '显示头部',
        showFoot: '显示尾部',
        showShadow: '显示阴影',
        padding: '内边距',
        cardTitle: '刘德华（无敌最帅的人，唱歌又好听）',
        cardSubTitle: '釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放',
        bodyText: '瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半',
        commentCount: '30评论'
    },

    cascader: {
        title: '级联选择器',
        // ===== 演示内容 =====
        basicUsage: '基础用法',
        withInput: '带输入框',
        asyncLoad: '异步加载',
        selectRegion: '选择地区',
        selectAddress: '请选择地址',
        placeholder: '请选择地区',
        asyncSelect: '异步选择',
        asyncDemoTitle: '异步加载示例',
        // 地区名（key 与选项 value 对应）
        region: {
            gansu: '甘肃省',
            jinchang: '金昌市',
            jinchuan: '金川区',
            yongchang: '永昌县',
            lanzhou: '兰州市',
            chengguan: '城关区',
            anning: '安宁区',
            qinghai: '青海省',
            xining: '西宁市',
            chengxi: '城西区',
            chengdong: '城东区',
            beijing: '北京市',
            shanghai: '上海市',
            guangzhou: '广州市',
            shenzhen: '深圳市',
            dongcheng: '东城区',
            xicheng: '西城区',
            chaoyang: '朝阳区',
            haidian: '海淀区',
            huangpu: '黄浦区',
            jingan: '静安区',
            xuhui: '徐汇区',
            pudong: '浦东新区',
            tianhe: '天河区',
            yuexiu: '越秀区',
            liwan: '荔湾区',
            futian: '福田区',
            nanshan: '南山区',
            baoan: '宝安区',
            chongwenmen: '崇文门',
            wangfujing: '王府井',
            xizhimen: '西直门',
            fuxingmen: '复兴门',
            sanlitun: '三里屯',
            bund: '外滩',
            peopleSquare: '人民广场',
            jinganTemple: '静安寺',
            nanjingWest: '南京西路',
            teemall: '天河城',
            cantonTower: '广州塔',
            cbdFutian: '福田CBD',
            szUniversity: '深圳大学',
            highTechPark: '科技园',
            windowOfWorld: '世界之窗'
        }
    },

    cell: {
        title: '单元格',
        // 选项点击反馈（带变量）
        clicked: (name: string) => `点击执行了：${name}`,
        // ===== 演示内容 =====
        toolbox: '工具箱',
        mine: '我的',
        magicBox: '我是一个神奇的小箱子',
        back: '返回',
        disabledCell: '禁用',
        valuePosition: 'value定位',
        cellSize: '单元格大小',
        arrowDirection: '右侧icon方向',
        posLeft: '左边',
        posCenter: '中间',
        posRight: '右边',
        sizeLarge: '大',
        sizeDefault: '默认',
        sizeSmall: '小',
        dirLeft: '向左',
        dirRight: '向右',
        dirUp: '向上',
        dirDown: '向下'
    },

    checkButton: {
        title: '复选框按钮',
        // ===== 演示内容 =====
        checkboxBtn: '复选按钮',
        radioBtn: '单选按钮',
        shapeSection: '形状',
        themeSection: '主题色',
        sizeSection: '大小',
        jobs: {
            teacher: '老师',
            nurse: '护士',
            stewardess: '空姐',
            writer: '作家',
            influencer: '网红'
        },
        shapeHalfCircle: '半圆',
        shapeSquare: '方形',
        themePrimary: '主要',
        themeSuccess: '信息',
        themeError: '危险',
        themeWarning: '提示',
        themeInfo: '默认',
        sizeSmall: '小',
        sizeMedium: '中',
        sizeLarge: '大'
    },

    checkbox: {
        title: '复选框',
        // ===== 演示内容 =====
        basicUsage: '基础使用',
        combinedComponent: '组合式组件',
        separateComponent: '分开式组件',
        disabledSection: '禁用',
        layoutSection: '布局',
        colorSection: '颜色配置',
        shapeSection: '形状',
        sizeSection: '大小',
        jobs: {
            teacher: '老师',
            nurse: '护士',
            stewardess: '空姐'
        },
        cars: {
            ferrari: '法拉利',
            lamborghini: '兰博基尼',
            bugatti: '布加迪',
            astonMartin: '阿斯顿马丁'
        },
        shapeCircle: '圆形',
        shapeSquare: '方形',
        sizeSmall: '小',
        sizeMedium: '中',
        sizeLarge: '大'
    },

    codeInput: {
        title: '验证码输入',
        // ===== 演示内容 =====
        basicUsage: '基础使用',
        lineMode: '线形模块',
        colorSection: '颜色',
        noBorder: '无边框',
        customLength: '自定义长度',
        keyboardLink: '与键盘联动',
        charSpace: '字符距离',
        showDot: '显示点',
        boldText: '字体加粗',
        hairlineBorder: '细边框',
        autoFocus: '自动获取焦点',
        keyboardTip: '点击输入框即可打开自定义键盘',
        done: '完成'
    },

    configProvider: {
        title: '全局配置',
        // ===== 演示内容 =====
        darkSection: '设置暗色',
        themeSection: '主题色',
        colors: {
            red: '红色',
            magenta: '紫红色',
            purple: '紫色',
            bluePurple: '蓝紫色',
            oceanBlue: '海蓝色',
            blue: '蓝色',
            indigo: '靛蓝色',
            cyan: '青色',
            green: '绿色',
            yellowGreen: '黄绿色',
            lime: '酸橙色',
            yellow: '黄色',
            orangeYellow: '橘黄色',
            orange: '橙色',
            orangeRed: '橘红色',
            brown: '棕色',
            darkGray: '玄灰色',
            gray: '灰色'
        }
    },

    countDown: {
        title: '倒计时',
        // ===== 演示内容 =====
        basicUsage: '基础使用',
        customFormat: '自定义格式',
        millisecondRender: '毫秒级渲染',
        customStyle: '自定义样式',
        manualControl: '手动控制',
        formatWithUnits: 'DD天HH时mm分ss秒',
        reset: '重置',
        start: '开始',
        pause: '暂停'
    },

    countTo: {
        title: '数字滚动',
        // ===== 演示内容 =====
        basicUsage: '基础使用',
        showDecimals: '显示小数点',
        thousandSeparator: '千分位分隔符',
        scrollDuration: '设置滚动时间',
        fontSetting: '设置字体',
        manualControl: '手动控制',
        start: '开始',
        pause: '暂停',
        resume: '继续'
    },

    coupon: {
        title: '优惠券',
        claimSuccess: '领取成功',
        // ===== 演示内容 =====
        demoTitle: '优惠券组件示例',
        bgColorSection: '设置背景色',
        longContent: '长内容',
        disabledSection: '优惠券禁用',
        shadowSection: '显示阴影',
        btnStyleSection: '按钮样式',
        testCoupon: '测试优惠券',
        testCouponDesc: '测试的优惠券',
        longTerm: '长期有效',
        couponTitle: '满28元减10元优惠券（绿标商品使用）',
        couponDesc:
            '1、现金券仅限绿标商品使用\n2、现金劵需购物满额方可使用\n3、现金劵在活动期内有效，过期作废，不后补\n4、现金劵不可与其他活动共享\n5、现金券不找零，不记名，不挂失',
        expired: '已过期',
        btnModeButton: '按钮',
        btnModeText: '文本按钮',
        btnModeNone: '无按钮',
        newcomerCoupon: '新人专享满减券',
        newcomerDesc: '满100元减20元，全场通用',
        freshCoupon: '生鲜8折优惠券',
        freshDesc: '仅限生鲜品类使用，最高优惠50元',
        noThresholdCoupon: '无门槛10元券',
        noThresholdDesc: '无最低消费限制，全场通用'
    },

    datetimePicker: {
        title: '时间选择器',
        fullDatetime: '完整日期时间',
        dateOnly: '仅日期',
        yearMonth: '年月',
        monthDay: '月日',
        timeOnly: '仅时间',
        hourMinute: '时分',
        buttonSection: '按钮触发',
        selectDate: '选择日期'
    },

    divider: {
        title: '分割线',
        basicUsage: '基础使用',
        demoText: '这是一段文字，后面跟着一条分割线。',
        dot: '点线',
        dashed: '虚线',
        thick: '加粗',
        textPosition: '文字位置',
        lineColor: '线条颜色'
    },

    dropdown: {
        title: '下拉菜单',
        all: '全部',
        chineseAnimation: '国漫',
        country: '国家',
        allGoods: '全部商品',
        discountGoods: '折扣商品',
        groupGoods: '团购商品',
        journeyWest: '斗破苍穹',
        battleThrough: '斗罗大陆',
        swallowedStar: '吞噬星空',
        soulLand: '斗魂大陆',
        heartStealer: '盗墓笔记',
        china: '中国',
        japan: '日本',
        korea: '韩国',
        usa: '美国'
    },

    empty: {
        title: '空状态',
        selectType: '选择类型',
        padding: '内边距',
        typeContent: '内容为空',
        typeSearch: '搜索无结果',
        typeAddress: '无收货地址',
        typeNetwork: '网络异常',
        typeOrder: '暂无订单',
        typeCoupon: '暂无优惠券',
        typeMessage: '暂无消息',
        typeComment: '暂无评论',
        typeIntegral: '暂无积分',
        typeCard: '暂无卡片',
        typeNotification: '暂无通知',
        typeShop: '暂无店铺',
        typeActivity: '暂无活动',
        typeLoading: '加载中'
    },

    flex: {
        title: '弹性布局',
        basicUsage: '基础使用',
        submit: '提交',
        review: '审核',
        delete: '删除',
        autoWrap: '自动换行',
        button: '按钮',
        justifySection: '主轴排列',
        alignSection: '交叉轴对齐',
        orientation: '排列方向',
        gapSection: '间隔'
    },

    floatButton: {
        title: '悬浮按钮',
        shapeSection: '形状',
        sizeSection: '大小',
        directionSection: '方向',
        positionSection: '位置',
        floatSwitch: '悬浮',
        shadowSwitch: '阴影',
        draggableSwitch: '可拖拽',
        expandSwitch: '展开',
        menu: (n: number) => `菜单${n}`,
        shapeCircle: '圆形',
        shapeSquare: '方形',
        sizeLarge: '大',
        sizeMedium: '中',
        sizeSmall: '小',
        directionRow: '水平',
        directionColumn: '垂直',
        posLeftTop: '左上',
        posRightTop: '右上',
        posLeftCenter: '左中',
        posRightCenter: '右中',
        posLeftBottom: '左下',
        posRightBottom: '右下',
        posTopCenter: '上中',
        posBottomCenter: '下中'
    },

    foldingPanel: {
        title: '折叠面板',
        fruits: '水果',
        fruitsValue: '苹果、香蕉、梨',
        fruitContent: '水果是指多汁且主要味觉为甜味和酸味，可食用的植物果实。',
        foodListTitle: '食物列表',
        beverageTitle: '饮品',
        beverageValue: '可乐、雪碧、芬达',
        customTitle: '自定义标题',
        customTitleTip: '这是自定义标题的描述内容',
        customHeader: '自定义头部',
        customHeaderTip: '这是自定义头部的描述内容',
        scrollTitle: '可滚动',
        itemN: (n: number) => `项目${n}`,
        dynamicTitle: '动态控制',
        loadMore: (len: number) => `加载更多 (共${len}条)`,
        sizeSection: '大小',
        disabledSection: '禁用',
        borderSection: '边框',
        accordionSection: '手风琴',
        sizeSmall: '小',
        sizeMedium: '中',
        sizeLarge: '大',
        foodRice: '米饭',
        foodNoodles: '面条',
        foodDumpling: '饺子',
        foodSteamedBun: '馒头',
        longText:
            '华玥组件库是一款集合了所以需求的现代化的组件库，华玥组件库是一款集合了所以需求的现代化的组件库',
        initialItem: (n: number) => `初始项${n}`,
        dynamicItem: (n: number) => `动态项${n}`
    },

    form: {
        title: '表单',
        submitSuccess: '提交成功',
        validateSuccess: '表单校验成功',
        validateFail: '表单校验失败',
        resetSuccess: '重置成功',
        // 表单校验 message
        usernameRequired: '请输入用户名',
        usernameLength: '用户名长度在 2 到 4 个字符',
        phoneRequired: '请输入手机号',
        phoneInvalid: '请输入正确的手机号',
        emailInvalid: '请输入正确的邮箱格式',
        passwordRequired: '请输入密码',
        passwordMin: '密码长度不能少于 6 个字符',
        confirmPasswordRequired: '请确认密码',
        passwordMismatch: '两次输入的密码不一致',
        genderRequired: '请选择性别'
    },

    formGroup: {
        title: '表单组',
        // 校验 message
        requiredField: '没有填内容',
        phoneRequired: '请输入您的手机号'
    },

    grid: {
        title: '宫格布局',
        basicUsage: '基础使用',
        nestedCard: '嵌套卡片',
        watchNow: '立即观看',
        viewers: (count: number) => `${count}人观看`,
        colSection: '列数',
        borderSection: '边框',
        padding: '内边距',
        menu: (n: number) => `菜单${n}`,
        course1: '语文',
        course2: '数学',
        course3: '英语',
        course4: '物理',
        clicked: (name: string) => `点击了: ${name}`
    },

    icon: {
        title: '图标'
    },

    image: {
        title: '图片',
        basicUsage: '基础使用',
        sizeSection: '大小',
        previewSection: '预览',
        indistinctSection: '模糊',
        loadErrorSection: '加载失败',
        circleSection: '圆形'
    },

    indexBar: {
        title: '索引栏',
        cityNames: {
            anqing: '安庆',
            anyang: '安阳',
            anshan: '鞍山',
            anshun: '安顺',
            ankang: '安康',
            aksu: '阿克苏',
            altay: '阿勒泰',
            beijing: '北京',
            shanghai: '上海',
            guangzhou: '广州',
            shenzhen: '深圳',
            chongqing: '重庆',
            chengdu: '成都',
            hangzhou: '杭州',
            wuhan: '武汉',
            xian: '西安',
            suzhou: '苏州',
            tianjin: '天津',
            nanjing: '南京',
            changsha: '长沙',
            zhengzhou: '郑州',
            dongguan: '东莞',
            qingdao: '青岛',
            shenyang: '沈阳',
            ningbo: '宁波',
            kunming: '昆明',
            changchun: '长春',
            changzhou: '常州',
            fuzhou: '福州',
            dalian: '大连',
            dezhou: '德州',
            datong: '大同',
            daqing: '大庆',
            dali: '大理',
            ezhou: '鄂州',
            enshi: '恩施',
            foshan: '佛山',
            fushun: '抚顺',
            fuxin: '阜新',
            fuyang: '阜阳',
            fuzhouJx: '抚州',
            guiyang: '贵阳',
            guilin: '桂林',
            ganzhou: '赣州',
            guangyuan: '广元',
            guangan: '广安',
            hefei: '合肥',
            harbin: '哈尔滨',
            haikou: '海口',
            huhhot: '呼和浩特',
            huzhou: '湖州',
            handan: '邯郸',
            hanzhong: '汉中',
            hengshui: '衡水',
            jinan: '济南',
            jilin: '吉林',
            jinzhou: '锦州',
            jingzhou: '荆州',
            jingmen: '荆门',
            jinjiang: '晋江',
            kaifeng: '开封',
            karamay: '克拉玛依',
            kashgar: '喀什',
            lanzhou: '兰州',
            luoyang: '洛阳',
            linyi: '临沂',
            liaocheng: '聊城',
            longyan: '龙岩',
            lijiang: '丽江',
            mianyang: '绵阳',
            maanshan: '马鞍山',
            maoming: '茂名',
            meizhou: '梅州',
            meishan: '眉山',
            nanchang: '南昌',
            nanning: '南宁',
            nantong: '南通',
            nanyang: '南阳',
            nanchong: '南充',
            pingdingshan: '平顶山',
            panjin: '盘锦',
            panzhihua: '攀枝花',
            pingxiang: '萍乡',
            quanzhou: '泉州',
            qujing: '曲靖',
            qinhuangdao: '秦皇岛',
            qiqihar: '齐齐哈尔',
            qingyang: '庆阳',
            rizhao: '日照',
            xigaze: '日喀则',
            rongchang: '荣昌',
            shijiazhuang: '石家庄',
            shaoxing: '绍兴',
            xiamen: '厦门',
            shangqiu: '商丘',
            shangrao: '上饶',
            shiyan: '十堰',
            taiyuan: '太原',
            tangshan: '唐山',
            taizhou: '泰州',
            taizhouZj: '台州',
            tongliao: '通辽',
            turpan: '吐鲁番',
            wenzhou: '温州',
            wuxi: '无锡',
            weifang: '潍坊',
            urumqi: '乌鲁木齐',
            weihai: '威海',
            weinan: '渭南',
            xuzhou: '徐州',
            xinxiang: '新乡',
            xinyang: '信阳',
            xiangyang: '襄阳',
            xining: '西宁',
            yantai: '烟台',
            yangzhou: '扬州',
            yichang: '宜昌',
            yueyang: '岳阳',
            yanan: '延安',
            yinchuan: '银川',
            yuncheng: '运城',
            zhuzhou: '株洲',
            zhuhai: '珠海',
            zhongshan: '中山',
            zhanjiang: '湛江',
            zhaoqing: '肇庆',
            zhangjiakou: '张家口',
            zaozhuang: '枣庄'
        }
    },

    input: {
        title: '输入框',
        basicUsage: '基础使用',
        phValue: '输入框的值',
        amountFormatSection: '金额格式化',
        clearableSection: '可清空',
        iconSection: '图标',
        customIconSection: '自定义图标',
        sendCode: '发送验证码',
        disabledSection: '禁用',
        shapeSection: '形状',
        typeSection: '类型',
        borderSection: '边框',
        defaultValue: '请输入内容',
        shapeCircle: '圆形',
        shapeSquare: '方形',
        typeText: '文本',
        typeNumber: '数字',
        typeIdcard: '身份证',
        typeDigit: '纯数字',
        typePassword: '密码',
        borderSurround: '四周',
        borderBottom: '底部',
        borderNone: '无'
    },

    keyboard: {
        title: 'Keyboard 键盘',
        sectionType: '键盘类型',
        subtitleKeyboardType: 'subtitle说明：设置键盘类型',
        defaultKeyboard: '默认键盘',
        sidebarKeyboard: '带侧边栏键盘',
        idcardKeyboard: '身份证键盘',
        carUncontrolled: '车牌键盘(非受控)',
        carControlled: '车牌键盘(受控)',
        sectionVariant: '变体',
        subtitleTitleExtra: 'subtitle说明：设置title和extra',
        titleKeyboard: '自定义title',
        slotTitle: 'slot自定义title',
        multipleExtra: '多个extra',
        randomKeyboard: '随机键盘',
        sectionConfig: '配置',
        subtitleDotControl: 'subtitle说明：小数点控制',
        noDot: '无小数点',
        customExtra: '自定义extra',
        done: '完成',
        demoTitle: '键盘示例',
        customTitleText: '请输入金额'
    },

    line: {
        title: '线条',
        basicUsage: '基础使用',
        customColor: '自定义颜色',
        vertical: '竖向',
        dashed: '虚线',
        thick: '加粗'
    },

    lineProgress: {
        title: '线形进度条',
        basicUsage: '基础使用',
        customHeight: '自定义高度',
        customColor: '自定义颜色',
        manualControl: '手动控制',
        minus: '减少',
        plus: '增加'
    },

    list: {
        title: '商品列表',
        searchPlaceholder: '搜索商品',
        tabHorizontal: '横向滚动',
        tabVertical: '纵向滚动'
    },

    loading: {
        title: '加载中',
        basicUsage: '基础使用',
        circleSection: '圆形',
        semicircleSection: '半圆',
        moreSection: '加载更多',
        customColorSection: '自定义颜色',
        customTextSection: '自定义文字',
        loadingText: '正在加载...'
    },

    menu: {
        title: '侧边菜单栏'
    },

    modal: {
        title: '模态框',
        // 校验 message
        requiredField: '没有填内容'
    },

    navbar: {
        title: '自定义导航栏'
    },

    noticeBar: {
        title: '滚动通知'
    },

    notify: {
        title: '消息提示'
    },

    numberBox: {
        title: '步进器'
    },

    overlay: {
        title: '遮罩层'
    },

    pagination: {
        title: '分页'
    },

    parse: {
        title: '富文本'
    },

    picker: {
        title: '选择器'
    },

    popover: {
        title: '气泡',
        // 点击反馈（带变量）
        clicked: (index: number) => `点击了第${index}个`
    },

    popup: {
        title: '弹出层'
    },

    price: {
        title: '金额'
    },

    qrcode: {
        title: '二维码'
    },

    radio: {
        title: '单选框'
    },

    rate: {
        title: '评分'
    },

    readMore: {
        title: '展开阅读更多'
    },

    rollingNum: {
        title: '翻滚数字'
    },

    scrollList: {
        title: '横向滚动列表',
        viewMore: '查看更多'
    },

    search: {
        title: '搜索'
    },

    signature: {
        title: '签名',
        // 横向签名子页面共用 namespace（Landscape.vue）
        landscapeTitle: '横向签名'
    },

    skeleton: {
        title: '骨架屏'
    },

    slider: {
        title: '滑动选择器'
    },

    steps: {
        title: '步骤条'
    },

    sticky: {
        title: '吸顶',
        // 吸顶事件反馈（带变量）
        capture: (isFixed: boolean | string) => `⚡️ 捕获埋点事件:${isFixed}`
    },

    submitBar: {
        title: '提交订单栏',
        // 点击反馈（带变量）
        clicked: (i: number) => `点击第${i}个`
    },

    subsection: {
        title: '分段器'
    },

    swipeAction: {
        title: '滑动单元格',
        close: '关闭',
        // 点击反馈（带变量）
        clicked: (value: string) => `点击了: ${value}`,
        clickedAction: (text: string) => `点击了: ${text}`,
        // 删除确认弹窗
        deleteTitle: '提示',
        deleteContent: '确定删除此条数据吗？',
        deleteSuccess: '删除成功'
    },

    swiper: {
        title: '轮播图'
    },

    switch: {
        title: '开关选择器'
    },

    tabBar: {
        title: '底部导航栏',
        // 切换反馈（带变量）
        switched: (value: number | string) => `切换第${value}个`
    },

    table: {
        title: '表格'
    },

    tabs: {
        title: '标签页'
    },

    tag: {
        title: '标签'
    },

    text: {
        title: '文本',
        // 平台限制提示
        mpOnly: '请在微信小程序内查看效果'
    },

    textarea: {
        title: '文本域'
    },

    toast: {
        title: '消息提示',
        // toast 默认提示文案
        defaultTip: (type: string) => `${type === 'show' ? '默认' : type}提示信息`,
        // 位置提示
        positionTop: '显示在顶部',
        positionCenter: '显示在居中',
        positionBottom: '显示在底部',
        // 时长提示
        manualClose: '需手动关闭',
        autoClose: (seconds: number) => `${seconds}秒后关闭`
    },

    tooltip: {
        title: '长按提示',
        // 点击反馈（带变量）
        clicked: (action: string) => `点击了「${action}」`,
        copySuccess: '复制成功'
    },

    transition: {
        title: '动画'
    },

    upload: {
        title: '上传',
        uploading: '上传中',
        uploadSuccess: '上传成功',
        // 超限提示（带变量）
        oversize: (size: string) => `图片超出${size}限制大小`
    },

    warn: {
        title: '警告提示'
    },

    waterfall: {
        title: '瀑布流'
    },

    watermark: {
        title: '水印'
    }
}
