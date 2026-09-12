<template>
    <the-root-page>
        <view class="hy-title">{{ t('iconImageRounded') }}</view>
        <view class="hy-flex">
            <hy-icon :name="config.avatar" size="80" round="5px" />
        </view>

        <view class="hy-title">{{ t('labelPositionSection') }}</view>
        <view class="hy-flex">
            <hy-icon :name="IconConfig.LOCK" :label="t('labelHorizontal')" label-pos="right" />
            <hy-icon :name="IconConfig.LOCK" :label="t('labelVertical')" label-pos="bottom" />
        </view>

        <view class="hy-title">{{ t('rotateSection') }}</view>
        <view class="hy-flex">
            <hy-icon :name="IconConfig.LOCK" is-rotate />
        </view>

        <view class="hy-title">{{ t('sizeSection') }}</view>
        <view class="hy-flex">
            <hy-icon :name="IconConfig.LOCK" size="12px" />
            <hy-icon :name="IconConfig.LOCK" size="30" />
        </view>

        <view class="hy-title">{{ t('colorSection') }}</view>
        <view class="hy-flex">
            <hy-icon :name="IconConfig.LOCK" color="red" />
            <hy-icon :name="IconConfig.LOCK" color="#FFD04B" />
        </view>

        <view class="hy-title">{{ t('customIconSection') }}</view>
        <view class="hy-flex">
            <hy-icon name="renzheng" customPrefix="icon" />
        </view>

        <view class="hy-title">{{ t('iconSetSection') }}</view>
        <view class="hy-container">
            <hy-grid :list="icons" size="30" border itemHeight="100" :col="4"></hy-grid>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IconConfig } from '@/package'
import { config } from '@/config/config'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '图标'
    }
})

const { t } = useTranslate('icon')
usePageTitle('icon')

// 图标集合（computed 包裹，响应语言切换）
const icons = computed(() => [
    {
        icon: 'loading',
        label: t('iconLoading'),
        name: 'LOADING'
    },
    {
        icon: 'close',
        label: t('iconClose'),
        name: 'CLOSE'
    },
    {
        icon: 'collect',
        label: t('iconStar'),
        name: 'STAR'
    },
    {
        icon: 'collect-fill',
        label: t('iconStarFill'),
        name: 'STAR_FILL'
    },
    {
        icon: 'smile',
        label: t('iconSmile'),
        name: 'SMILE'
    },
    {
        icon: 'smile-fill',
        label: t('iconSmileFill'),
        name: 'SMILE_FILL'
    },
    {
        icon: 'cry-fill',
        label: t('iconCryFill'),
        name: 'CRY_FILL'
    },
    {
        icon: 'check-mask',
        label: t('iconCheckMask'),
        name: 'CHECK_MASK'
    },
    {
        icon: 'edit',
        label: t('iconEdit'),
        name: 'EDIT'
    },
    {
        icon: 'shop',
        label: t('iconShop'),
        name: 'SHOP'
    },
    {
        icon: 'lock-fill',
        label: t('iconLockFill'),
        name: 'LOCK_FILL'
    },
    {
        icon: 'lock-open-fill',
        label: t('iconLockOpenFill'),
        name: 'LOCK_OPEN_FILL'
    },
    {
        icon: 'lock',
        label: t('iconLock'),
        name: 'LOCK'
    },
    {
        icon: 'map',
        label: t('iconMap'),
        name: 'MAP'
    },
    {
        icon: 'map-fill',
        label: t('iconMapFill'),
        name: 'MAP_FILL'
    },
    {
        icon: 'shopping-cart',
        label: t('iconShoppingCart'),
        name: 'SHOPPING_CART'
    },
    {
        icon: 'shopping-cart-fill',
        label: t('iconShoppingCartFill'),
        name: 'SHOPPING_CART_FILL'
    },
    {
        icon: 'shopping-cart-add',
        label: t('iconShoppingCartAdd'),
        name: 'SHOPPING_CART_ADD'
    },
    {
        icon: 'shopping-bag',
        label: t('iconShoppingBag'),
        name: 'SHOPPING_BAG'
    },
    {
        icon: 'refresh',
        label: t('iconRefresh'),
        name: 'REFRESH'
    },
    {
        icon: 'task',
        label: t('iconTask'),
        name: 'TASK'
    },
    {
        icon: 'tag',
        label: t('iconTag'),
        name: 'TAG'
    },
    {
        icon: 'left',
        label: t('iconLeft'),
        name: 'LEFT'
    },
    {
        icon: 'right',
        label: t('iconRight'),
        name: 'RIGHT'
    },
    {
        icon: 'up',
        label: t('iconUp'),
        name: 'UP'
    },
    {
        icon: 'down',
        label: t('iconDown'),
        name: 'DOWN'
    },
    {
        icon: 'arrow-up-fill',
        label: t('iconArrowUpFill'),
        name: 'ARROW_UP_FILL'
    },
    {
        icon: 'arrow-down-fill',
        label: t('iconArrowDownFill'),
        name: 'ARROW_DOWN_FILL'
    },
    {
        icon: 'arrow-left-fill',
        label: t('iconArrowLeftFill'),
        name: 'ARROW_LEFT_FILL'
    },
    {
        icon: 'arrow-right-fill',
        label: t('iconArrowRightFill'),
        name: 'ARROW_RIGHT_FILL'
    },
    {
        icon: 'arrow-double-left',
        label: t('iconArrowDoubleLeft'),
        name: 'ARROW_DOUBLE_LEFT'
    },
    {
        icon: 'arrow-double-right',
        label: t('iconArrowDoubleRight'),
        name: 'ARROW_DOUBLE_RIGHT'
    },
    {
        icon: 'arrow-leftward',
        label: t('iconArrowLeftward'),
        name: 'ARROW_LEFTWARD'
    },
    {
        icon: 'arrow-rightward',
        label: t('iconArrowRightward'),
        name: 'ARROW_RIGHTWARD'
    },
    {
        icon: 'arrow-upward',
        label: t('iconArrowUpward'),
        name: 'ARROW_UPWARD'
    },
    {
        icon: 'arrow-downward',
        label: t('iconArrowDownward'),
        name: 'ARROW_DOWNWARD'
    },
    {
        icon: 'history',
        label: t('iconHistory'),
        name: 'HISTORY'
    },
    {
        icon: 'time',
        label: t('iconTime'),
        name: 'TIME'
    },
    {
        icon: 'network',
        label: t('iconNetwork'),
        name: 'NETWORK'
    },
    {
        icon: 'list-dot',
        label: t('iconList'),
        name: 'LIST_DOT'
    },
    {
        icon: 'menu',
        label: t('iconMenu'),
        name: 'MENU'
    },
    {
        icon: 'search',
        label: t('iconSearch'),
        name: 'SEARCH'
    },
    {
        icon: 'plus',
        label: t('iconPlus'),
        name: 'PLUS'
    },
    {
        icon: 'minus',
        label: t('iconMinus'),
        name: 'MINUS'
    },
    {
        icon: 'remind',
        label: t('iconRemind'),
        name: 'REMIND'
    },
    {
        icon: 'remind-fill',
        label: t('iconRemindFill'),
        name: 'REMIND_FILL'
    },
    {
        icon: 'warning',
        label: t('iconWarning'),
        name: 'WARNING'
    },
    {
        icon: 'warning-fill',
        label: t('iconWarningFill'),
        name: 'WARNING_FILL'
    },
    {
        icon: 'delete',
        label: t('iconDelete'),
        name: 'DELETE'
    },
    {
        icon: 'delete-fill',
        label: t('iconDeleteFill'),
        name: 'DELETE_FILL'
    },
    {
        icon: 'screen',
        label: t('iconScreen'),
        name: 'SCREEN'
    },
    {
        icon: 'class',
        label: t('iconClass'),
        name: 'CLASS'
    },
    {
        icon: 'class-fill',
        label: t('iconClassFill'),
        name: 'CLASS_FILL'
    },
    {
        icon: 'home',
        label: t('iconHome'),
        name: 'HOME'
    },
    {
        icon: 'home-fill',
        label: t('iconHomeFill'),
        name: 'HOME_FILL'
    },
    {
        icon: 'mine',
        label: t('iconMine'),
        name: 'MINE'
    },
    {
        icon: 'mine-fill',
        label: t('iconMineFill'),
        name: 'MINE_FILL'
    },
    {
        icon: 'setting',
        label: t('iconSetting'),
        name: 'SETTING'
    },
    {
        icon: 'setting-fill',
        label: t('iconSettingFill'),
        name: 'SETTING_FILL'
    },
    {
        icon: 'close-circle',
        label: t('iconCloseCircle'),
        name: 'CLOSE_CIRCLE'
    },
    {
        icon: 'close-circle-fill',
        label: t('iconCloseCircleFill'),
        name: 'CLOSE_CIRCLE_FILL'
    },
    {
        icon: 'notice',
        label: t('iconNotice'),
        name: 'NOTICE'
    },
    {
        icon: 'notice-circle',
        label: t('iconNoticeCircle'),
        name: 'NOTICE_CIRCLE'
    },
    {
        icon: 'notice-fill',
        label: t('iconNoticeFill'),
        name: 'NOTICE_FILL'
    },
    {
        icon: 'success',
        label: t('iconSuccess'),
        name: 'SUCCESS'
    },
    {
        icon: 'success-fill',
        label: t('iconSuccessFill'),
        name: 'SUCCESS_FILL'
    },
    {
        icon: 'query',
        label: t('iconQuery'),
        name: 'QUERY'
    },
    {
        icon: 'help-circle',
        label: t('iconHelp'),
        name: 'HELP'
    },
    {
        icon: 'help-fill',
        label: t('iconHelpFill'),
        name: 'HELP_FILL'
    },
    {
        icon: 'upload',
        label: t('iconUpload'),
        name: 'UPLOAD'
    },
    {
        icon: 'switch',
        label: t('iconSwitch'),
        name: 'SWITCH'
    },
    {
        icon: 'download',
        label: t('iconDownload'),
        name: 'DOWNLOAD'
    },
    {
        icon: 'security',
        label: t('iconSecurity'),
        name: 'SECURITY'
    },
    {
        icon: 'scan',
        label: t('iconScan'),
        name: 'SCAN'
    },
    {
        icon: 'save',
        label: t('iconSave'),
        name: 'SAVE'
    },
    {
        icon: 'picture',
        label: t('iconPicture'),
        name: 'PHOTO'
    },
    {
        icon: 'picture-fill',
        label: t('iconPictureFill'),
        name: 'PHOTO_FILL'
    },
    {
        icon: 'pdf',
        label: 'pdf',
        name: 'PDF'
    },
    {
        icon: 'navigation',
        label: t('iconNavigation'),
        name: 'NAVIGATION'
    },
    {
        icon: 'print',
        label: t('iconPrint'),
        name: 'PRINT'
    },
    {
        icon: 'layers',
        label: 'layers',
        name: 'LAYERS'
    },
    {
        icon: 'link',
        label: t('iconLink'),
        name: 'LINK'
    },
    {
        icon: 'export',
        label: t('iconExport'),
        name: 'EXPORT'
    },
    {
        icon: 'ellipsis',
        label: t('iconEllipsis'),
        name: 'ELLIPSIS'
    },
    {
        icon: 'customer-service',
        label: t('iconCustomerService'),
        name: 'CUSTOMER_SERVICE'
    },
    {
        icon: 'comment',
        label: t('iconComment'),
        name: 'COMMENT'
    },
    {
        icon: 'message',
        label: t('iconMessage'),
        name: 'MESSAGE'
    },
    {
        icon: 'message-fill',
        label: t('iconMessageFill'),
        name: 'MESSAGE_FILL'
    },
    {
        icon: 'systemprompt_fill',
        label: t('iconNotificationFill'),
        name: 'NOTIFICATION_FILL'
    },
    {
        icon: 'attachment',
        label: t('iconAttachment'),
        name: 'ATTACHMENT'
    },
    {
        icon: 'camera',
        label: t('iconCamera'),
        name: 'CAMERA'
    },
    {
        icon: 'eye',
        label: t('iconEye'),
        name: 'EYE'
    },
    {
        icon: 'eye-close',
        label: t('iconEyeClose'),
        name: 'EYE_CLOSE'
    },
    {
        icon: 'hide',
        label: t('iconHide'),
        name: 'HIDE'
    },
    {
        icon: 'calendar',
        label: t('iconCalendar'),
        name: 'CALENDAR'
    },
    {
        icon: 'copy',
        label: t('iconCopy'),
        name: 'COPY'
    },
    {
        icon: 'order',
        label: t('iconOrder'),
        name: 'ORDER'
    },
    {
        icon: 'share',
        label: t('iconShare'),
        name: 'SHARE'
    },
    {
        icon: 'share-fill',
        label: t('iconShareFill'),
        name: 'SHARE_FILL'
    },
    {
        icon: 'send',
        label: t('iconSend'),
        name: 'SEND'
    },
    {
        icon: 'telephone-out',
        label: t('iconTelephoneOut'),
        name: 'TELEPHONE_OUT'
    },
    {
        icon: 'telephone',
        label: t('iconTelephone'),
        name: 'TELEPHONE'
    },
    {
        icon: 'telephone-fill',
        label: t('iconTelephoneFill'),
        name: 'TELEPHONE_FILL'
    },
    {
        icon: 'mic',
        label: t('iconMic'),
        name: 'MIC'
    },
    {
        icon: 'pie-chart',
        label: t('iconPieChart'),
        name: 'PIE_CHART'
    },
    {
        icon: 'bar-chart',
        label: t('iconBarChart'),
        name: 'BAR_CHART'
    },
    {
        icon: 'clear',
        label: t('iconClear'),
        name: 'CLEAR'
    }
])

useShareButton()
</script>

<style scoped lang="scss">
.icon {
    box-sizing: border-box;
    width: 100vw;
}
</style>
