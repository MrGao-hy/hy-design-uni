/**
 * pages-design 页面国际化 —— 中文模块（a-c 开头的页面）
 * 命名空间 = 页面目录名，每个 namespace 至少包含 title（对应 navigationBarTitleText）
 * 展示型数据在页面中用 computed 包裹 t() 以响应语言切换
 */
export default {
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
    }
}
