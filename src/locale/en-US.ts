export default {
    mine: {
        vip: 'VIP',
        bio: 'This person is lazy and left nothing.',
        components: 'Components',
        following: 'Following',
        followers: 'Followers',
        likes: 'Likes',
        orders: 'My Orders',
        address: 'Address',
        messages: 'Messages',
        favorites: 'Favorites',
        settings: 'Settings',
        help: 'Help & Feedback',
        about: 'About Us',
        language: 'Language',
        logout: 'Log Out',
        logoutConfirm: 'Are you sure you want to log out?',
        logoutTitle: 'Confirm Logout',
        logoutSuccess: 'Logged out',
        logoutFail: 'Logout failed, please retry',
        pageNotExist: 'Page not found',
        langSwitch: 'Switched to Chinese',
        langSwitchEn: 'Switched to English',
        harmonyTools: 'HarmonyOS Tools'
    },

    // ============ pages-design 页面国际化 ============
    // 命名空间 = 页面目录名，每个 namespace 至少包含 title（对应 navigationBarTitleText）
    // 包含「页面标题 + 功能性交互文案 + 演示内容文案」；展示型数据在页面中用 computed 包裹 t() 以响应语言切换

    actionSheet: {
        title: 'Action Sheet',
        clicked: (name: string) => `Clicked: ${name}`,
        clickedNoClose: (name: string) => `Clicked: ${name} (no close)`,
        clickedCancel: 'Clicked cancel',
        // ===== Demo content =====
        sectionBasic: 'Basic',
        sectionStatus: 'Option Status',
        sectionPanel: 'Custom Panel',
        sectionAdvanced: 'Advanced',
        basicUsage: 'Basic Usage',
        withTitle: 'With Title',
        withCancel: 'With Cancel Button',
        disabledState: 'Disabled',
        loadingState: 'Loading',
        customColor: 'Custom Color',
        withDescription: 'Description',
        singlePanel: 'Single-row Panel',
        multiPanel: 'Multi-row Panel',
        noCloseOnClick: 'No Close on Click',
        customSlot: 'Custom Slot',
        sheetTitle: 'I am the title',
        cancelText: 'Cancel',
        shareTo: 'Share to',
        customContentTitle: 'Custom Content',
        customContentText: 'This is the custom content area',
        confirmClose: 'Confirm & Close',
        option: (n: number) => `Option ${n}`,
        normalOption: 'Normal option',
        disabledOption: 'Disabled option',
        otherOption: 'Other option',
        loadingOption: 'Loading...',
        normalText: 'Normal text',
        redWarning: 'Red warning',
        blueLink: 'Blue link',
        desc1: 'This is a description',
        desc2: 'This is another description',
        wechat: 'WeChat',
        weibo: 'Weibo',
        qq: 'QQ',
        favorite: 'Favorite',
        qqFriend: 'QQ Friend',
        wechatFriend: 'WeChat Friend',
        moments: 'Moments'
    },

    addressPicker: {
        title: 'Address Picker',
        // ===== Demo content =====
        basicUsage: 'Basic Usage',
        separator: 'Separator'
    },

    avatar: {
        title: 'Avatar',
        // ===== Demo content =====
        basicUsage: 'Basic Usage',
        textAvatar: 'Text Avatar',
        iconAvatar: 'Icon Avatar',
        differentSize: 'Different Sizes',
        customColor: 'Custom Color',
        colorIndex: 'Color Index',
        avatarShape: 'Avatar Shape',
        customTextStyle: 'Custom Text Style',
        clickEvent: 'Click Event',
        surnameHu: 'Hu',
        surnameLi: 'Li',
        surnameSun: 'Sun',
        surnameWang: 'Wang',
        colorRed: 'Red',
        colorGreen: 'Green',
        colorBlue: 'Blue',
        colorPurple: 'Purple',
        fontBig: 'Big',
        fontSmall: 'Small',
        fontWhite: 'White',
        fontBlack: 'Black',
        // Long-press image menu
        sendToFriend: 'Send to friend',
        saveImage: 'Save image',
        favoriteImage: 'Favorite'
    },

    backTop: {
        title: 'Back to Top',
        // ===== Demo content =====
        indicator: 'Indicator',
        duration: 'Duration',
        rightDistance: 'Right Distance',
        bottomDistance: 'Bottom Distance',
        shapeCircle: 'Circle',
        shapeSquare: 'Square'
    },

    badge: {
        title: 'Badge',
        // ===== Demo content =====
        shapeSection: 'Corner Shape',
        displaySection: 'Display Mode',
        dotSection: 'Dot',
        themeSection: 'Theme Colors',
        invertedSection: 'Inverted Colors',
        absoluteSection: 'Absolute Position'
    },

    button: {
        title: 'Button',
        // ===== Demo content =====
        basicButton: 'Basic Button',
        buttonColor: 'Button Color',
        plainButton: 'Plain Button',
        plainNoBorder: 'Plain Button (No Border)',
        buttonIcon: 'Button Icon',
        loadingButton: 'Loading Button',
        buttonSize: 'Button Size',
        buttonShape: 'Button Shape',
        longText: 'I am a very long button, press me for a surprise',
        button: 'Button',
        defaultButton: 'Default',
        primaryButton: 'Primary',
        infoButton: 'Info',
        dangerButton: 'Danger',
        warningButton: 'Warning',
        gradientButton: 'Gradient',
        delete: 'Delete',
        submitting: 'Submitting...',
        largeButton: 'Large',
        smallButton: 'Small',
        miniButton: 'Mini',
        squareButton: 'Square',
        circleButton: 'Circle'
    },

    calendar: {
        title: 'Calendar',
        // ===== Demo content =====
        demo: {
            single: 'Single Date',
            multiple: 'Multiple Dates',
            range: 'Date Range',
            themeColor: 'Custom Theme Color',
            customText: 'Custom Text',
            maxRange: 'Max Date Range',
            lunar: 'Lunar Calendar',
            defaultDate: 'Default Date',
            rangeLimit: 'Date Range Limit',
            rangeLimit7: 'Range Limit (7 days)',
            forbid: 'Disabled Date',
            readonly: 'Read-only',
            multipleLimit: 'Multiple Limit',
            weekText: 'Custom Week Text'
        },
        startText: 'Check-in',
        endText: 'Check-out',
        confirmDisabledText: 'Please select check-out date',
        rangePrompt: 'Up to 7 days',
        forbidDaysToast: 'This date is already booked',
        discount: 'Discount'
    },

    card: {
        title: 'Card',
        // ===== Demo content =====
        basicUsage: 'Basic Usage',
        showHead: 'Show Header',
        showFoot: 'Show Footer',
        showShadow: 'Show Shadow',
        padding: 'Padding',
        cardTitle: 'Andy Lau (Unbeatably handsome, with a great voice)',
        cardSubTitle:
            'The glaze hides the charm of the lady painting, and your sweet smile is like a bud about to bloom',
        bodyText:
            'The peony painted on the vase is like your first makeup, the sandalwood drifts through the window, I know your thoughts, the brush stops halfway on the rice paper',
        commentCount: '30 comments'
    },

    cascader: {
        title: 'Cascader',
        // ===== Demo content =====
        basicUsage: 'Basic Usage',
        withInput: 'With Input',
        asyncLoad: 'Async Loading',
        selectRegion: 'Select Region',
        selectAddress: 'Select Address',
        placeholder: 'Select region',
        asyncSelect: 'Async Select',
        asyncDemoTitle: 'Async Loading Demo',
        // Region names (keys match option values)
        region: {
            gansu: 'Gansu',
            jinchang: 'Jinchang',
            jinchuan: 'Jinchuan',
            yongchang: 'Yongchang',
            lanzhou: 'Lanzhou',
            chengguan: 'Chengguan',
            anning: 'Anning',
            qinghai: 'Qinghai',
            xining: 'Xining',
            chengxi: 'Chengxi',
            chengdong: 'Chengdong',
            beijing: 'Beijing',
            shanghai: 'Shanghai',
            guangzhou: 'Guangzhou',
            shenzhen: 'Shenzhen',
            dongcheng: 'Dongcheng',
            xicheng: 'Xicheng',
            chaoyang: 'Chaoyang',
            haidian: 'Haidian',
            huangpu: 'Huangpu',
            jingan: "Jing'an",
            xuhui: 'Xuhui',
            pudong: 'Pudong',
            tianhe: 'Tianhe',
            yuexiu: 'Yuexiu',
            liwan: 'Liwan',
            futian: 'Futian',
            nanshan: 'Nanshan',
            baoan: "Bao'an",
            chongwenmen: 'Chongwenmen',
            wangfujing: 'Wangfujing',
            xizhimen: 'Xizhimen',
            fuxingmen: 'Fuxingmen',
            sanlitun: 'Sanlitun',
            bund: 'The Bund',
            peopleSquare: "People's Square",
            jinganTemple: "Jing'an Temple",
            nanjingWest: 'Nanjing Rd. West',
            teemall: 'Teemall',
            cantonTower: 'Canton Tower',
            cbdFutian: 'Futian CBD',
            szUniversity: 'Shenzhen University',
            highTechPark: 'Hi-tech Park',
            windowOfWorld: 'Window of the World'
        }
    },

    cell: {
        title: 'Cell',
        clicked: (name: string) => `Clicked: ${name}`,
        // ===== Demo content =====
        toolbox: 'Toolbox',
        mine: 'Mine',
        magicBox: 'I am a magic little box',
        back: 'Back',
        disabledCell: 'Disabled',
        valuePosition: 'Value Position',
        cellSize: 'Cell Size',
        arrowDirection: 'Arrow Direction',
        posLeft: 'Left',
        posCenter: 'Center',
        posRight: 'Right',
        sizeLarge: 'Large',
        sizeDefault: 'Default',
        sizeSmall: 'Small',
        dirLeft: 'Left',
        dirRight: 'Right',
        dirUp: 'Up',
        dirDown: 'Down'
    },

    checkButton: {
        title: 'Check Button',
        // ===== Demo content =====
        checkboxBtn: 'Checkbox',
        radioBtn: 'Radio',
        shapeSection: 'Shape',
        themeSection: 'Theme Color',
        sizeSection: 'Size',
        jobs: {
            teacher: 'Teacher',
            nurse: 'Nurse',
            stewardess: 'Stewardess',
            writer: 'Writer',
            influencer: 'Influencer'
        },
        shapeHalfCircle: 'Half Circle',
        shapeSquare: 'Square',
        themePrimary: 'Primary',
        themeSuccess: 'Success',
        themeError: 'Error',
        themeWarning: 'Warning',
        themeInfo: 'Default',
        sizeSmall: 'Small',
        sizeMedium: 'Medium',
        sizeLarge: 'Large'
    },

    checkbox: {
        title: 'Checkbox',
        // ===== Demo content =====
        basicUsage: 'Basic Usage',
        combinedComponent: 'Combined',
        separateComponent: 'Separate',
        disabledSection: 'Disabled',
        layoutSection: 'Layout',
        colorSection: 'Color',
        shapeSection: 'Shape',
        sizeSection: 'Size',
        jobs: {
            teacher: 'Teacher',
            nurse: 'Nurse',
            stewardess: 'Stewardess'
        },
        cars: {
            ferrari: 'Ferrari',
            lamborghini: 'Lamborghini',
            bugatti: 'Bugatti',
            astonMartin: 'Aston Martin'
        },
        shapeCircle: 'Circle',
        shapeSquare: 'Square',
        sizeSmall: 'Small',
        sizeMedium: 'Medium',
        sizeLarge: 'Large'
    },

    codeInput: {
        title: 'Code Input',
        // ===== Demo content =====
        basicUsage: 'Basic Usage',
        lineMode: 'Line Mode',
        colorSection: 'Color',
        noBorder: 'No Border',
        customLength: 'Custom Length',
        keyboardLink: 'Keyboard Linkage',
        charSpace: 'Character Space',
        showDot: 'Show Dot',
        boldText: 'Bold',
        hairlineBorder: 'Hairline',
        autoFocus: 'Auto Focus',
        keyboardTip: 'Tap the input to open the custom keyboard',
        done: 'Done'
    },

    configProvider: {
        title: 'Config Provider',
        // ===== Demo content =====
        darkSection: 'Dark Mode',
        themeSection: 'Theme Color',
        colors: {
            red: 'Red',
            magenta: 'Magenta',
            purple: 'Purple',
            bluePurple: 'Blue Purple',
            oceanBlue: 'Ocean Blue',
            blue: 'Blue',
            indigo: 'Indigo',
            cyan: 'Cyan',
            green: 'Green',
            yellowGreen: 'Yellow Green',
            lime: 'Lime',
            yellow: 'Yellow',
            orangeYellow: 'Orange Yellow',
            orange: 'Orange',
            orangeRed: 'Orange Red',
            brown: 'Brown',
            darkGray: 'Dark Gray',
            gray: 'Gray'
        }
    },

    countDown: {
        title: 'Countdown',
        // ===== Demo content =====
        basicUsage: 'Basic Usage',
        customFormat: 'Custom Format',
        millisecondRender: 'Millisecond',
        customStyle: 'Custom Style',
        manualControl: 'Manual Control',
        formatWithUnits: 'DDd HHh mmm sss',
        reset: 'Reset',
        start: 'Start',
        pause: 'Pause'
    },

    countTo: {
        title: 'Count To',
        // ===== Demo content =====
        basicUsage: 'Basic Usage',
        showDecimals: 'Decimals',
        thousandSeparator: 'Separator',
        scrollDuration: 'Duration',
        fontSetting: 'Font',
        manualControl: 'Manual Control',
        start: 'Start',
        pause: 'Pause',
        resume: 'Resume'
    },

    coupon: {
        title: 'Coupon',
        claimSuccess: 'Claimed successfully',
        // ===== Demo content =====
        demoTitle: 'Coupon Demo',
        bgColorSection: 'Background',
        longContent: 'Long Content',
        disabledSection: 'Disabled',
        shadowSection: 'Shadow',
        btnStyleSection: 'Button Style',
        testCoupon: 'Test Coupon',
        testCouponDesc: 'A test coupon',
        longTerm: 'No expiry',
        couponTitle: '¥10 off ¥28 coupon (green-label items only)',
        couponDesc:
            '1. Valid for green-label items only\n2. Minimum spend required\n3. Valid during the event period, no reissue after expiry\n4. Cannot be combined with other promotions\n5. No change given, unnamed, not replaceable if lost',
        expired: 'Expired',
        btnModeButton: 'Button',
        btnModeText: 'Text Button',
        btnModeNone: 'None',
        newcomerCoupon: 'Newcomer Coupon',
        newcomerDesc: '¥20 off ¥100, site-wide',
        freshCoupon: '20% off Fresh Food',
        freshDesc: 'Fresh food only, up to ¥50 off',
        noThresholdCoupon: '¥10 No-threshold Coupon',
        noThresholdDesc: 'No minimum spend, site-wide'
    },

    datetimePicker: {
        title: 'Datetime Picker',
        fullDatetime: 'Full Datetime',
        dateOnly: 'Date Only',
        yearMonth: 'Year-Month',
        monthDay: 'Month-Day',
        timeOnly: 'Time Only',
        hourMinute: 'Hour-Minute',
        buttonSection: 'Button Trigger',
        selectDate: 'Select date'
    },

    divider: {
        title: 'Divider',
        basicUsage: 'Basic Usage',
        demoText: 'Text followed by a divider.',
        dot: 'Dotted',
        dashed: 'Dashed',
        thick: 'Thick',
        textPosition: 'Text Position',
        lineColor: 'Line Color'
    },

    dropdown: {
        title: 'Dropdown',
        all: 'All',
        chineseAnimation: 'Chinese Anime',
        country: 'Country',
        allGoods: 'All Products',
        discountGoods: 'Discount',
        groupGoods: 'Group Buy',
        journeyWest: 'Journey West',
        battleThrough: 'Battle Through',
        swallowedStar: 'Swallowed Star',
        soulLand: 'Soul Land',
        heartStealer: 'Heart Stealer',
        china: 'China',
        japan: 'Japan',
        korea: 'Korea',
        usa: 'USA'
    },

    empty: {
        title: 'Empty',
        selectType: 'Select Type',
        padding: 'Padding',
        typeContent: 'No Content',
        typeSearch: 'No Results',
        typeAddress: 'No Address',
        typeNetwork: 'Network Error',
        typeOrder: 'No Orders',
        typeCoupon: 'No Coupons',
        typeMessage: 'No Messages',
        typeComment: 'No Comments',
        typeIntegral: 'No Points',
        typeCard: 'No Cards',
        typeNotification: 'No Notifications',
        typeShop: 'No Shops',
        typeActivity: 'No Activities',
        typeLoading: 'Loading'
    },

    flex: {
        title: 'Flex',
        basicUsage: 'Basic Usage',
        submit: 'Submit',
        review: 'Review',
        delete: 'Delete',
        autoWrap: 'Auto Wrap',
        button: 'Button',
        justifySection: 'Justify',
        alignSection: 'Align',
        orientation: 'Direction',
        gapSection: 'Gap'
    },

    floatButton: {
        title: 'Float Button',
        shapeSection: 'Shape',
        sizeSection: 'Size',
        directionSection: 'Direction',
        positionSection: 'Position',
        floatSwitch: 'Float',
        shadowSwitch: 'Shadow',
        draggableSwitch: 'Draggable',
        expandSwitch: 'Expand',
        menu: (n: number) => `Menu ${n}`,
        shapeCircle: 'Circle',
        shapeSquare: 'Square',
        sizeLarge: 'Large',
        sizeMedium: 'Medium',
        sizeSmall: 'Small',
        directionRow: 'Horizontal',
        directionColumn: 'Vertical',
        posLeftTop: 'Top-Left',
        posRightTop: 'Top-Right',
        posLeftCenter: 'Mid-Left',
        posRightCenter: 'Mid-Right',
        posLeftBottom: 'Bottom-Left',
        posRightBottom: 'Bottom-Right',
        posTopCenter: 'Top-Center',
        posBottomCenter: 'Bottom-Center'
    },

    foldingPanel: {
        title: 'Folding Panel',
        fruits: 'Fruits',
        fruitsValue: 'Apple, Banana, Pear',
        fruitContent: 'Fruits are juicy plant products with sweet or sour taste.',
        foodListTitle: 'Food List',
        beverageTitle: 'Beverages',
        beverageValue: 'Cola, Sprite, Fanta',
        customTitle: 'Custom Title',
        customTitleTip: 'Custom title description',
        customHeader: 'Custom Header',
        customHeaderTip: 'Custom header description',
        scrollTitle: 'Scrollable',
        itemN: (n: number) => `Item ${n}`,
        dynamicTitle: 'Dynamic Control',
        loadMore: (len: number) => `Load more (${len} items)`,
        sizeSection: 'Size',
        disabledSection: 'Disabled',
        borderSection: 'Border',
        accordionSection: 'Accordion',
        sizeSmall: 'Small',
        sizeMedium: 'Medium',
        sizeLarge: 'Large',
        foodRice: 'Rice',
        foodNoodles: 'Noodles',
        foodDumpling: 'Dumplings',
        foodSteamedBun: 'Steamed Bun',
        longText: 'HuaYue UI is a modern component library that meets all your needs.',
        initialItem: (n: number) => `Initial ${n}`,
        dynamicItem: (n: number) => `Dynamic ${n}`
    },

    form: {
        title: 'Form',
        submitSuccess: 'Submitted successfully',
        validateSuccess: 'Validation passed',
        validateFail: 'Validation failed',
        resetSuccess: 'Reset successfully',
        usernameRequired: 'Please enter username',
        usernameLength: 'Username length must be 2 to 4 characters',
        phoneRequired: 'Please enter phone number',
        phoneInvalid: 'Please enter a valid phone number',
        emailInvalid: 'Please enter a valid email',
        passwordRequired: 'Please enter password',
        passwordMin: 'Password must be at least 6 characters',
        confirmPasswordRequired: 'Please confirm password',
        passwordMismatch: 'The two passwords do not match',
        genderRequired: 'Please select gender'
    },

    formGroup: {
        title: 'Form Group',
        requiredField: 'This field is required',
        phoneRequired: 'Please enter your phone number'
    },

    grid: {
        title: 'Grid',
        basicUsage: 'Basic Usage',
        nestedCard: 'Nested Card',
        watchNow: 'Watch Now',
        viewers: (count: number) => `${count} views`,
        colSection: 'Columns',
        borderSection: 'Border',
        padding: 'Padding',
        menu: (n: number) => `Menu ${n}`,
        course1: 'Chinese',
        course2: 'Math',
        course3: 'English',
        course4: 'Physics',
        clicked: (name: string) => `Clicked: ${name}`
    },

    icon: {
        title: 'Icon'
    },

    image: {
        title: 'Image',
        basicUsage: 'Basic Usage',
        sizeSection: 'Size',
        previewSection: 'Preview',
        indistinctSection: 'Blur',
        loadErrorSection: 'Load Error',
        circleSection: 'Circle'
    },

    indexBar: {
        title: 'Index Bar',
        cityNames: {
            anqing: 'Anqing',
            anyang: 'Anyang',
            anshan: 'Anshan',
            anshun: 'Anshun',
            ankang: 'Ankang',
            aksu: 'Aksu',
            altay: 'Altay',
            beijing: 'Beijing',
            shanghai: 'Shanghai',
            guangzhou: 'Guangzhou',
            shenzhen: 'Shenzhen',
            chongqing: 'Chongqing',
            chengdu: 'Chengdu',
            hangzhou: 'Hangzhou',
            wuhan: 'Wuhan',
            xian: "Xi'an",
            suzhou: 'Suzhou',
            tianjin: 'Tianjin',
            nanjing: 'Nanjing',
            changsha: 'Changsha',
            zhengzhou: 'Zhengzhou',
            dongguan: 'Dongguan',
            qingdao: 'Qingdao',
            shenyang: 'Shenyang',
            ningbo: 'Ningbo',
            kunming: 'Kunming',
            changchun: 'Changchun',
            changzhou: 'Changzhou',
            fuzhou: 'Fuzhou',
            dalian: 'Dalian',
            dezhou: 'Dezhou',
            datong: 'Datong',
            daqing: 'Daqing',
            dali: 'Dali',
            ezhou: 'Ezhou',
            enshi: 'Enshi',
            foshan: 'Foshan',
            fushun: 'Fushun',
            fuxin: 'Fuxin',
            fuyang: 'Fuyang',
            fuzhouJx: 'Fuzhou (JX)',
            guiyang: 'Guiyang',
            guilin: 'Guilin',
            ganzhou: 'Ganzhou',
            guangyuan: 'Guangyuan',
            guangan: "Guang'an",
            hefei: 'Hefei',
            harbin: 'Harbin',
            haikou: 'Haikou',
            huhhot: 'Hohhot',
            huzhou: 'Huzhou',
            handan: 'Handan',
            hanzhong: 'Hanzhong',
            hengshui: 'Hengshui',
            jinan: 'Jinan',
            jilin: 'Jilin',
            jinzhou: 'Jinzhou',
            jingzhou: 'Jingzhou',
            jingmen: 'Jingmen',
            jinjiang: 'Jinjiang',
            kaifeng: 'Kaifeng',
            karamay: 'Karamay',
            kashgar: 'Kashgar',
            lanzhou: 'Lanzhou',
            luoyang: 'Luoyang',
            linyi: 'Linyi',
            liaocheng: 'Liaocheng',
            longyan: 'Longyan',
            lijiang: 'Lijiang',
            mianyang: 'Mianyang',
            maanshan: "Ma'anshan",
            maoming: 'Maoming',
            meizhou: 'Meizhou',
            meishan: 'Meishan',
            nanchang: 'Nanchang',
            nanning: 'Nanning',
            nantong: 'Nantong',
            nanyang: 'Nanyang',
            nanchong: 'Nanchong',
            pingdingshan: 'Pingdingshan',
            panjin: 'Panjin',
            panzhihua: 'Panzhihua',
            pingxiang: 'Pingxiang',
            quanzhou: 'Quanzhou',
            qujing: 'Qujing',
            qinhuangdao: 'Qinhuangdao',
            qiqihar: 'Qiqihar',
            qingyang: 'Qingyang',
            rizhao: 'Rizhao',
            xigaze: 'Xigaze',
            rongchang: 'Rongchang',
            shijiazhuang: 'Shijiazhuang',
            shaoxing: 'Shaoxing',
            xiamen: 'Xiamen',
            shangqiu: 'Shangqiu',
            shangrao: 'Shangrao',
            shiyan: 'Shiyan',
            taiyuan: 'Taiyuan',
            tangshan: 'Tangshan',
            taizhou: 'Taizhou',
            taizhouZj: 'Taizhou (ZJ)',
            tongliao: 'Tongliao',
            turpan: 'Turpan',
            wenzhou: 'Wenzhou',
            wuxi: 'Wuxi',
            weifang: 'Weifang',
            urumqi: 'Urumqi',
            weihai: 'Weihai',
            weinan: 'Weinan',
            xuzhou: 'Xuzhou',
            xinxiang: 'Xinxiang',
            xinyang: 'Xinyang',
            xiangyang: 'Xiangyang',
            xining: 'Xining',
            yantai: 'Yantai',
            yangzhou: 'Yangzhou',
            yichang: 'Yichang',
            yueyang: 'Yueyang',
            yanan: "Yan'an",
            yinchuan: 'Yinchuan',
            yuncheng: 'Yuncheng',
            zhuzhou: 'Zhuzhou',
            zhuhai: 'Zhuhai',
            zhongshan: 'Zhongshan',
            zhanjiang: 'Zhanjiang',
            zhaoqing: 'Zhaoqing',
            zhangjiakou: 'Zhangjiakou',
            zaozhuang: 'Zaozhuang'
        }
    },

    input: {
        title: 'Input',
        basicUsage: 'Basic Usage',
        phValue: 'Input value',
        amountFormatSection: 'Amount Format',
        clearableSection: 'Clearable',
        iconSection: 'Icon',
        customIconSection: 'Custom Icon',
        sendCode: 'Send Code',
        disabledSection: 'Disabled',
        shapeSection: 'Shape',
        typeSection: 'Type',
        borderSection: 'Border',
        defaultValue: 'Enter content',
        shapeCircle: 'Circle',
        shapeSquare: 'Square',
        typeText: 'Text',
        typeNumber: 'Number',
        typeIdcard: 'ID Card',
        typeDigit: 'Digit',
        typePassword: 'Password',
        borderSurround: 'Surround',
        borderBottom: 'Bottom',
        borderNone: 'None'
    },

    keyboard: {
        title: 'Keyboard',
        sectionType: 'Keyboard Type',
        subtitleKeyboardType: 'subtitle: Set keyboard type',
        defaultKeyboard: 'Default Keyboard',
        sidebarKeyboard: 'Sidebar Keyboard',
        idcardKeyboard: 'ID Card Keyboard',
        carUncontrolled: 'Car Plate (Uncontrolled)',
        carControlled: 'Car Plate (Controlled)',
        sectionVariant: 'Variant',
        subtitleTitleExtra: 'subtitle: Set title and extra',
        titleKeyboard: 'Custom Title',
        slotTitle: 'Slot Title',
        multipleExtra: 'Multiple Extra',
        randomKeyboard: 'Random Keyboard',
        sectionConfig: 'Config',
        subtitleDotControl: 'subtitle: Dot control',
        noDot: 'No Dot',
        customExtra: 'Custom Extra',
        done: 'Done',
        demoTitle: 'Keyboard Demo',
        customTitleText: 'Enter amount'
    },

    line: {
        title: 'Line',
        basicUsage: 'Basic Usage',
        customColor: 'Custom Color',
        vertical: 'Vertical',
        dashed: 'Dashed',
        thick: 'Thick'
    },

    lineProgress: {
        title: 'Line Progress',
        basicUsage: 'Basic Usage',
        customHeight: 'Custom Height',
        customColor: 'Custom Color',
        manualControl: 'Manual Control',
        minus: 'Minus',
        plus: 'Plus'
    },

    list: {
        title: 'Product List',
        searchPlaceholder: 'Search products',
        tabHorizontal: 'Horizontal',
        tabVertical: 'Vertical'
    },

    loading: {
        title: 'Loading',
        basicUsage: 'Basic Usage',
        circleSection: 'Circle',
        semicircleSection: 'Semicircle',
        moreSection: 'Load More',
        customColorSection: 'Custom Color',
        customTextSection: 'Custom Text',
        loadingText: 'Loading...'
    },

    menu: {
        title: 'Side Menu'
    },

    modal: {
        title: 'Modal',
        requiredField: 'This field is required'
    },

    navbar: {
        title: 'Navbar'
    },

    noticeBar: {
        title: 'Notice Bar'
    },

    notify: {
        title: 'Notify'
    },

    numberBox: {
        title: 'Number Box'
    },

    overlay: {
        title: 'Overlay'
    },

    pagination: {
        title: 'Pagination'
    },

    parse: {
        title: 'Rich Text'
    },

    picker: {
        title: 'Picker'
    },

    popover: {
        title: 'Popover',
        clicked: (index: number) => `Clicked #${index}`
    },

    popup: {
        title: 'Popup'
    },

    price: {
        title: 'Price'
    },

    qrcode: {
        title: 'QR Code'
    },

    radio: {
        title: 'Radio'
    },

    rate: {
        title: 'Rate'
    },

    readMore: {
        title: 'Read More'
    },

    rollingNum: {
        title: 'Rolling Number'
    },

    scrollList: {
        title: 'Scroll List',
        viewMore: 'View more'
    },

    search: {
        title: 'Search'
    },

    signature: {
        title: 'Signature',
        landscapeTitle: 'Landscape Signature'
    },

    skeleton: {
        title: 'Skeleton'
    },

    slider: {
        title: 'Slider'
    },

    steps: {
        title: 'Steps'
    },

    sticky: {
        title: 'Sticky',
        capture: (isFixed: boolean | string) => `⚡️ Captured event: ${isFixed}`
    },

    submitBar: {
        title: 'Submit Bar',
        clicked: (i: number) => `Clicked #${i}`
    },

    subsection: {
        title: 'Subsection'
    },

    swipeAction: {
        title: 'Swipe Action',
        close: 'Close',
        clicked: (value: string) => `Clicked: ${value}`,
        clickedAction: (text: string) => `Clicked: ${text}`,
        deleteTitle: 'Notice',
        deleteContent: 'Delete this item?',
        deleteSuccess: 'Deleted'
    },

    swiper: {
        title: 'Swiper'
    },

    switch: {
        title: 'Switch'
    },

    tabBar: {
        title: 'Tab Bar',
        switched: (value: number | string) => `Switched to #${value}`
    },

    table: {
        title: 'Table'
    },

    tabs: {
        title: 'Tabs'
    },

    tag: {
        title: 'Tag'
    },

    text: {
        title: 'Text',
        mpOnly: 'Please view in WeChat mini program'
    },

    textarea: {
        title: 'Textarea'
    },

    toast: {
        title: 'Toast',
        defaultTip: (type: string) => `${type === 'show' ? 'Default' : type} toast message`,
        positionTop: 'Shown at top',
        positionCenter: 'Shown at center',
        positionBottom: 'Shown at bottom',
        manualClose: 'Manual close required',
        autoClose: (seconds: number) => `Closes after ${seconds}s`
    },

    tooltip: {
        title: 'Tooltip',
        clicked: (action: string) => `Clicked "${action}"`,
        copySuccess: 'Copied successfully'
    },

    transition: {
        title: 'Transition'
    },

    upload: {
        title: 'Upload',
        uploading: 'Uploading',
        uploadSuccess: 'Upload success',
        oversize: (size: string) => `Image exceeds ${size} size limit`
    },

    warn: {
        title: 'Warn'
    },

    waterfall: {
        title: 'Waterfall'
    },

    watermark: {
        title: 'Watermark'
    }
}
