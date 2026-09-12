/**
 * pages-design i18n — English module (pages starting with a-c)
 * Namespace = page directory name; each namespace contains at least title (navigationBarTitleText)
 * Demo data is wrapped in computed with t() in pages to react to language switching
 */
export default {
    actionSheet: {
        title: 'Action Sheet',
        // Option click feedback (with variable)
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
        // Cell click feedback (with variable)
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
    }
}
