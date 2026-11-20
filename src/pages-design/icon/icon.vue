<template>
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
        <hy-grid
            :list="icons"
            :customKeys="{ name: 'label', icon: 'icon' }"
            size="50"
            border
            itemHeight="100"
            :col="4"
        ></hy-grid>
    </view>
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
        icon: 'add-circle',
        label: t('iconAddCircle'),
        name: 'ADD_CIRCLE'
    },
    {
        icon: 'add-circle-fill',
        label: t('iconAddCircleFill'),
        name: 'ADD_CIRCLE_FILL'
    },
    {
        icon: 'add-picture',
        label: t('iconAddPicture'),
        name: 'ADD_PICTURE'
    },
    {
        icon: 'address-book',
        label: t('iconAddressBook'),
        name: 'ADDRESS_BOOK'
    },
    {
        icon: 'aiming',
        label: t('iconAiming'),
        name: 'AIMING'
    },
    {
        icon: 'alarm-clock',
        label: t('iconAlarmClock'),
        name: 'ALARM_CLOCK'
    },
    {
        icon: 'all-application',
        label: t('iconAllApplication'),
        name: 'ALL_APPLICATION'
    },
    {
        icon: 'all-application-fill',
        label: t('iconAllApplicationFill'),
        name: 'ALL_APPLICATION_FILL'
    },
    {
        icon: 'arrow-circle-down',
        label: t('iconArrowCircleDown'),
        name: 'ARROW_CIRCLE_DOWN'
    },
    {
        icon: 'arrow-circle-left',
        label: t('iconArrowCircleLeft'),
        name: 'ARROW_CIRCLE_LEFT'
    },
    {
        icon: 'arrow-circle-right',
        label: t('iconArrowCircleRight'),
        name: 'ARROW_CIRCLE_RIGHT'
    },
    {
        icon: 'arrow-circle-up',
        label: t('iconArrowCircleUp'),
        name: 'ARROW_CIRCLE_UP'
    },
    {
        icon: 'arrow-down',
        label: t('iconArrowDown'),
        name: 'ARROW_DOWN'
    },
    {
        icon: 'arrow-left',
        label: t('iconArrowLeft'),
        name: 'ARROW_LEFT'
    },
    {
        icon: 'arrow-left-down',
        label: t('iconArrowLeftDown'),
        name: 'ARROW_LEFT_DOWN'
    },
    {
        icon: 'arrow-left-up',
        label: t('iconArrowLeftUp'),
        name: 'ARROW_LEFT_UP'
    },
    {
        icon: 'arrow-right',
        label: t('iconArrowRight'),
        name: 'ARROW_RIGHT'
    },
    {
        icon: 'arrow-right-down',
        label: t('iconArrowRightDown'),
        name: 'ARROW_RIGHT_DOWN'
    },
    {
        icon: 'arrow-right-up',
        label: t('iconArrowRightUp'),
        name: 'ARROW_RIGHT_UP'
    },
    {
        icon: 'arrow-up',
        label: t('iconArrowUp'),
        name: 'ARROW_UP'
    },
    {
        icon: 'at-sign',
        label: t('iconAtSign'),
        name: 'AT_SIGN'
    },
    {
        icon: 'attention',
        label: t('iconAttention'),
        name: 'ATTENTION'
    },
    {
        icon: 'attention-fill',
        label: t('iconAttentionFill'),
        name: 'ATTENTION_FILL'
    },
    {
        icon: 'back',
        label: t('iconBack'),
        name: 'BACK'
    },
    {
        icon: 'bad',
        label: t('iconBad'),
        name: 'BAD'
    },
    {
        icon: 'bad-fill',
        label: t('iconBadFill'),
        name: 'BAD_FILL'
    },
    {
        icon: 'bank-card',
        label: t('iconBankCard'),
        name: 'BANK_CARD'
    },
    {
        icon: 'bank-card-fill',
        label: t('iconBankCardFill'),
        name: 'BANK_CARD_FILL'
    },
    {
        icon: 'bluetooth',
        label: t('iconBluetooth'),
        name: 'BLUETOOTH'
    },
    {
        icon: 'bookmark',
        label: t('iconBookmark'),
        name: 'BOOKMARK'
    },
    {
        icon: 'bookmark-fill',
        label: t('iconBookmarkFill'),
        name: 'BOOKMARK_FILL'
    },
    {
        icon: 'calendar',
        label: t('iconCalendar'),
        name: 'CALENDAR'
    },
    {
        icon: 'camera',
        label: t('iconCamera'),
        name: 'CAMERA'
    },
    {
        icon: 'caution',
        label: t('iconCaution'),
        name: 'CAUTION'
    },
    {
        icon: 'caution-fill',
        label: t('iconCautionFill'),
        name: 'CAUTION_FILL'
    },
    {
        icon: 'certificate',
        label: t('iconCertificate'),
        name: 'CERTIFICATE'
    },
    {
        icon: 'chart-pie',
        label: t('iconChartPie'),
        name: 'CHART_PIE'
    },
    {
        icon: 'chart-pie-fill',
        label: t('iconChartPieFill'),
        name: 'CHART_PIE_FILL'
    },
    {
        icon: 'check',
        label: t('iconCheck'),
        name: 'CHECK'
    },
    {
        icon: 'check-circle',
        label: t('iconCheckCircle'),
        name: 'CHECK_CIRCLE'
    },
    {
        icon: 'check-circle-fill',
        label: t('iconCheckCircleFill'),
        name: 'CHECK_CIRCLE_FILL'
    },
    {
        icon: 'check-square',
        label: t('iconCheckSquare'),
        name: 'CHECK_SQUARE'
    },
    {
        icon: 'check-square-fill',
        label: t('iconCheckSquareFill'),
        name: 'CHECK_SQUARE_FILL'
    },
    {
        icon: 'close',
        label: t('iconClose'),
        name: 'CLOSE'
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
        icon: 'close-wifi',
        label: t('iconCloseWifi'),
        name: 'CLOSE_WIFI'
    },
    {
        icon: 'cloud-download',
        label: t('iconCloudDownload'),
        name: 'CLOUD_DOWNLOAD'
    },
    {
        icon: 'cloud-upload',
        label: t('iconCloudUpload'),
        name: 'CLOUD_UPLOAD'
    },
    {
        icon: 'comment',
        label: t('iconComment'),
        name: 'COMMENT'
    },
    {
        icon: 'comment-fill',
        label: t('iconCommentFill'),
        name: 'COMMENT_FILL'
    },
    {
        icon: 'comments',
        label: t('iconComments'),
        name: 'COMMENTS'
    },
    {
        icon: 'comments-fill',
        label: t('iconCommentsFill'),
        name: 'COMMENTS_FILL'
    },
    {
        icon: 'copy',
        label: t('iconCopy'),
        name: 'COPY'
    },
    {
        icon: 'copy-fill',
        label: t('iconCopyFill'),
        name: 'COPY_FILL'
    },
    {
        icon: 'coupon',
        label: t('iconCoupon'),
        name: 'COUPON'
    },
    {
        icon: 'coupon-fill',
        label: t('iconCouponFill'),
        name: 'COUPON_FILL'
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
        icon: 'del',
        label: t('iconDelete'),
        name: 'DEL'
    },
    {
        icon: 'del-fill',
        label: t('iconDeleteFill'),
        name: 'DEL_FILL'
    },
    {
        icon: 'dislike',
        label: t('iconDislike'),
        name: 'DISLIKE'
    },
    {
        icon: 'doc-search',
        label: t('iconDocSearch'),
        name: 'DOC_SEARCH'
    },
    {
        icon: 'document-folder',
        label: t('iconDocumentFolder'),
        name: 'DOCUMENT_FOLDER'
    },
    {
        icon: 'double-down',
        label: t('iconDoubleDown'),
        name: 'DOUBLE_DOWN'
    },
    {
        icon: 'double-left',
        label: t('iconDoubleLeft'),
        name: 'DOUBLE_LEFT'
    },
    {
        icon: 'double-right',
        label: t('iconDoubleRight'),
        name: 'DOUBLE_RIGHT'
    },
    {
        icon: 'double-up',
        label: t('iconDoubleUp'),
        name: 'DOUBLE_UP'
    },
    {
        icon: 'down',
        label: t('iconDown'),
        name: 'DOWN'
    },
    {
        icon: 'down-fill',
        label: t('iconDownFill'),
        name: 'DOWN_FILL'
    },
    {
        icon: 'down-picture',
        label: t('iconDownPicture'),
        name: 'DOWN_PICTURE'
    },
    {
        icon: 'download',
        label: t('iconDownload'),
        name: 'DOWNLOAD'
    },
    {
        icon: 'earth',
        label: t('iconEarth'),
        name: 'EARTH'
    },
    {
        icon: 'edit',
        label: t('iconEdit'),
        name: 'EDIT'
    },
    {
        icon: 'edit-fill',
        label: t('iconEditFill'),
        name: 'EDIT_FILL'
    },
    {
        icon: 'edit-name',
        label: t('iconEditName'),
        name: 'EDIT_NAME'
    },
    {
        icon: 'emotion-happy',
        label: t('iconEmotionHappy'),
        name: 'EMOTION_HAPPY'
    },
    {
        icon: 'emotion-happy-fill',
        label: t('iconEmotionHappyFill'),
        name: 'EMOTION_HAPPY_FILL'
    },
    {
        icon: 'emotion-unhappy',
        label: t('iconEmotionUnhappy'),
        name: 'EMOTION_UNHAPPY'
    },
    {
        icon: 'emotion-unhappy-fill',
        label: t('iconEmotionUnhappyFill'),
        name: 'EMOTION_UNHAPPY_FILL'
    },
    {
        icon: 'equalizer',
        label: t('iconEqualizer'),
        name: 'EQUALIZER'
    },
    {
        icon: 'expand-down',
        label: t('iconExpandDown'),
        name: 'EXPAND_DOWN'
    },
    {
        icon: 'eye-close',
        label: t('iconEyeClose'),
        name: 'EYE_CLOSE'
    },
    {
        icon: 'eye-open',
        label: t('iconEyeOpen'),
        name: 'EYE_OPEN'
    },
    {
        icon: 'female',
        label: t('iconFemale'),
        name: 'FEMALE'
    },
    {
        icon: 'file-addition',
        label: t('iconFileAddition'),
        name: 'FILE_ADDITION'
    },
    {
        icon: 'file-addition-fill',
        label: t('iconFileAdditionFill'),
        name: 'FILE_ADDITION_FILL'
    },
    {
        icon: 'file-conversion',
        label: t('iconFileConversion'),
        name: 'FILE_CONVERSION'
    },
    {
        icon: 'file-editing',
        label: t('iconFileEditing'),
        name: 'FILE_EDITING'
    },
    {
        icon: 'file-pdf',
        label: t('iconFilePdf'),
        name: 'FILE_PDF'
    },
    {
        icon: 'file-zip',
        label: t('iconFileZip'),
        name: 'FILE_ZIP'
    },
    {
        icon: 'filter',
        label: t('iconFilter'),
        name: 'FILTER'
    },
    {
        icon: 'filter-fill',
        label: t('iconFilterFill'),
        name: 'FILTER_FILL'
    },
    {
        icon: 'fingerprint',
        label: t('iconFingerprint'),
        name: 'FINGERPRINT'
    },
    {
        icon: 'fold-up',
        label: t('iconFoldUp'),
        name: 'FOLD_UP'
    },
    {
        icon: 'gift',
        label: t('iconGift'),
        name: 'GIFT'
    },
    {
        icon: 'gift-fill',
        label: t('iconGiftFill'),
        name: 'GIFT_FILL'
    },
    {
        icon: 'go-bottom',
        label: t('iconGoBottom'),
        name: 'GO_BOTTOM'
    },
    {
        icon: 'go-end',
        label: t('iconGoEnd'),
        name: 'GO_END'
    },
    {
        icon: 'go-start',
        label: t('iconGoStart'),
        name: 'GO_START'
    },
    {
        icon: 'go-top',
        label: t('iconGoTop'),
        name: 'GO_TOP'
    },
    {
        icon: 'good',
        label: t('iconGood'),
        name: 'GOOD'
    },
    {
        icon: 'good-fill',
        label: t('iconGoodFill'),
        name: 'GOOD_FILL'
    },
    {
        icon: 'headset',
        label: t('iconHeadset'),
        name: 'HEADSET'
    },
    {
        icon: 'help',
        label: t('iconHelp'),
        name: 'HELP'
    },
    {
        icon: 'help-fill',
        label: t('iconHelpFill'),
        name: 'HELP_FILL'
    },
    {
        icon: 'history',
        label: t('iconHistory'),
        name: 'HISTORY'
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
        icon: 'id-card',
        label: t('iconIdCard'),
        name: 'ID_CARD'
    },
    {
        icon: 'info',
        label: t('iconInfo'),
        name: 'INFO'
    },
    {
        icon: 'info-fill',
        label: t('iconInfoFill'),
        name: 'INFO_FILL'
    },
    {
        icon: 'ios-face-recognition',
        label: t('iconIosFaceRecognition'),
        name: 'IOS_FACE_RECOGNITION'
    },
    {
        icon: 'left',
        label: t('iconLeft'),
        name: 'LEFT'
    },
    {
        icon: 'left-fill',
        label: t('iconLeftFill'),
        name: 'LEFT_FILL'
    },
    {
        icon: 'like',
        label: t('iconLike'),
        name: 'LIKE'
    },
    {
        icon: 'like-fill',
        label: t('iconLikeFill'),
        name: 'LIKE_FILL'
    },
    {
        icon: 'link',
        label: t('iconLink'),
        name: 'LINK'
    },
    {
        icon: 'list',
        label: t('iconList'),
        name: 'LIST'
    },
    {
        icon: 'local',
        label: t('iconLocal'),
        name: 'LOCAL'
    },
    {
        icon: 'local-fill',
        label: t('iconLocalFill'),
        name: 'LOCAL_FILL'
    },
    {
        icon: 'location',
        label: t('iconLocation'),
        name: 'LOCATION'
    },
    {
        icon: 'location-fill',
        label: t('iconLocationFill'),
        name: 'LOCATION_FILL'
    },
    {
        icon: 'lock',
        label: t('iconLock'),
        name: 'LOCK'
    },
    {
        icon: 'lock-fill',
        label: t('iconLockFill'),
        name: 'LOCK_FILL'
    },
    {
        icon: 'mail',
        label: t('iconMail'),
        name: 'MAIL'
    },
    {
        icon: 'male',
        label: t('iconMale'),
        name: 'MALE'
    },
    {
        icon: 'mall-bag',
        label: t('iconMallBag'),
        name: 'MALL_BAG'
    },
    {
        icon: 'mall-bag-fill',
        label: t('iconMallBagFill'),
        name: 'MALL_BAG_FILL'
    },
    {
        icon: 'me',
        label: t('iconMe'),
        name: 'ME'
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
        icon: 'minus',
        label: t('iconMinus'),
        name: 'MINUS'
    },
    {
        icon: 'moon',
        label: t('iconMoon'),
        name: 'MOON'
    },
    {
        icon: 'moon-fill',
        label: t('iconMoonFill'),
        name: 'MOON_FILL'
    },
    {
        icon: 'more',
        label: t('iconMore'),
        name: 'MORE'
    },
    {
        icon: 'more-app',
        label: t('iconMoreApp'),
        name: 'MORE_APP'
    },
    {
        icon: 'more-app-fill',
        label: t('iconMoreAppFill'),
        name: 'MORE_APP_FILL'
    },
    {
        icon: 'more-circle',
        label: t('iconMoreCircle'),
        name: 'MORE_CIRCLE'
    },
    {
        icon: 'more-circle-fill',
        label: t('iconMoreCircleFill'),
        name: 'MORE_CIRCLE_FILL'
    },
    {
        icon: 'more-vertical',
        label: t('iconMoreVertical'),
        name: 'MORE_VERTICAL'
    },
    {
        icon: 'navigation',
        label: t('iconNavigation'),
        name: 'NAVIGATION'
    },
    {
        icon: 'navigation-fill',
        label: t('iconNavigationFill'),
        name: 'NAVIGATION_FILL'
    },
    {
        icon: 'order',
        label: t('iconOrder'),
        name: 'ORDER'
    },
    {
        icon: 'order-fill',
        label: t('iconOrderFill'),
        name: 'ORDER_FILL'
    },
    {
        icon: 'pause',
        label: t('iconPause'),
        name: 'PAUSE'
    },
    {
        icon: 'pause-circle',
        label: t('iconPauseCircle'),
        name: 'PAUSE_CIRCLE'
    },
    {
        icon: 'pause-circle-fill',
        label: t('iconPauseCircleFill'),
        name: 'PAUSE_CIRCLE_FILL'
    },
    {
        icon: 'pay-code',
        label: t('iconPayCode'),
        name: 'PAY_CODE'
    },
    {
        icon: 'people',
        label: t('iconPeople'),
        name: 'PEOPLE'
    },
    {
        icon: 'people-fill',
        label: t('iconPeopleFill'),
        name: 'PEOPLE_FILL'
    },
    {
        icon: 'phone',
        label: t('iconPhone'),
        name: 'PHONE'
    },
    {
        icon: 'phone-fill',
        label: t('iconPhoneFill'),
        name: 'PHONE_FILL'
    },
    {
        icon: 'phone-incoming',
        label: t('iconPhoneIncoming'),
        name: 'PHONE_INCOMING'
    },
    {
        icon: 'phone-off',
        label: t('iconPhoneOff'),
        name: 'PHONE_OFF'
    },
    {
        icon: 'phone-outgoing',
        label: t('iconPhoneOutgoing'),
        name: 'PHONE_OUTGOING'
    },
    {
        icon: 'phone-telephone',
        label: t('iconPhoneTelephone'),
        name: 'PHONE_TELEPHONE'
    },
    {
        icon: 'phone-telephone-fill',
        label: t('iconPhoneTelephoneFill'),
        name: 'PHONE_TELEPHONE_FILL'
    },
    {
        icon: 'pic',
        label: t('iconPic'),
        name: 'PIC'
    },
    {
        icon: 'pic-fill',
        label: t('iconPicFill'),
        name: 'PIC_FILL'
    },
    {
        icon: 'picture-album',
        label: t('iconPictureAlbum'),
        name: 'PICTURE_ALBUM'
    },
    {
        icon: 'play',
        label: t('iconPlay'),
        name: 'PLAY'
    },
    {
        icon: 'play-circle',
        label: t('iconPlayCircle'),
        name: 'PLAY_CIRCLE'
    },
    {
        icon: 'play-circle-fill',
        label: t('iconPlayCircleFill'),
        name: 'PLAY_CIRCLE_FILL'
    },
    {
        icon: 'play-cycle',
        label: t('iconPlayCycle'),
        name: 'PLAY_CYCLE'
    },
    {
        icon: 'plus',
        label: t('iconPlus'),
        name: 'PLUS'
    },
    {
        icon: 'power',
        label: t('iconPower'),
        name: 'POWER'
    },
    {
        icon: 'preview-close',
        label: t('iconPreviewClose'),
        name: 'PREVIEW_CLOSE'
    },
    {
        icon: 'protect',
        label: t('iconProtect'),
        name: 'PROTECT'
    },
    {
        icon: 'protect-fill',
        label: t('iconProtectFill'),
        name: 'PROTECT_FILL'
    },
    {
        icon: 'qr-code',
        label: t('iconQrCode'),
        name: 'QR_CODE'
    },
    {
        icon: 'radar',
        label: t('iconRadar'),
        name: 'RADAR'
    },
    {
        icon: 'reduce',
        label: t('iconReduce'),
        name: 'REDUCE'
    },
    {
        icon: 'reduce-fill',
        label: t('iconReduceFill'),
        name: 'REDUCE_FILL'
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
        icon: 'replay-music',
        label: t('iconReplayMusic'),
        name: 'REPLAY_MUSIC'
    },
    {
        icon: 'right',
        label: t('iconRight'),
        name: 'RIGHT'
    },
    {
        icon: 'right-fill',
        label: t('iconRightFill'),
        name: 'RIGHT_FILL'
    },
    {
        icon: 'rss',
        label: t('iconRss'),
        name: 'RSS'
    },
    {
        icon: 'rss-fill',
        label: t('iconRssFill'),
        name: 'RSS_FILL'
    },
    {
        icon: 'save',
        label: t('iconSave'),
        name: 'SAVE'
    },
    {
        icon: 'scan',
        label: t('iconScan'),
        name: 'SCAN'
    },
    {
        icon: 'search',
        label: t('iconSearch'),
        name: 'SEARCH'
    },
    {
        icon: 'search-fill',
        label: t('iconSearchFill'),
        name: 'SEARCH_FILL'
    },
    {
        icon: 'send',
        label: t('iconSend'),
        name: 'SEND'
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
        icon: 'shake',
        label: t('iconShake'),
        name: 'SHAKE'
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
        icon: 'share-external',
        label: t('iconShareExternal'),
        name: 'SHARE_EXTERNAL'
    },
    {
        icon: 'share-link',
        label: t('iconShareLink'),
        name: 'SHARE_LINK'
    },
    {
        icon: 'share-one',
        label: t('iconShareOne'),
        name: 'SHARE_ONE'
    },
    {
        icon: 'shield-add',
        label: t('iconShieldAdd'),
        name: 'SHIELD_ADD'
    },
    {
        icon: 'shield-add-fill',
        label: t('iconShieldAddFill'),
        name: 'SHIELD_ADD_FILL'
    },
    {
        icon: 'shop',
        label: t('iconShop'),
        name: 'SHOP'
    },
    {
        icon: 'shop-fill',
        label: t('iconShopFill'),
        name: 'SHOP_FILL'
    },
    {
        icon: 'shopping',
        label: t('iconShopping'),
        name: 'SHOPPING'
    },
    {
        icon: 'shopping-fill',
        label: t('iconShoppingFill'),
        name: 'SHOPPING_FILL'
    },
    {
        icon: 'shopping-cart-add',
        label: t('iconShoppingCartAdd'),
        name: 'SHOPPING_CART_ADD'
    },
    {
        icon: 'shopping-cart-add-fill',
        label: t('iconShoppingCartAddFill'),
        name: 'SHOPPING_CART_ADD_FILL'
    },
    {
        icon: 'signal',
        label: t('iconSignal'),
        name: 'SIGNAL'
    },
    {
        icon: 'sort',
        label: t('iconSort'),
        name: 'SORT'
    },
    {
        icon: 'star',
        label: t('iconStar'),
        name: 'STAR'
    },
    {
        icon: 'star-fill',
        label: t('iconStarFill'),
        name: 'STAR_FILL'
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
        icon: 'sun',
        label: t('iconSun'),
        name: 'SUN'
    },
    {
        icon: 'sun-fill',
        label: t('iconSunFill'),
        name: 'SUN_FILL'
    },
    {
        icon: 'switch',
        label: t('iconSwitch'),
        name: 'SWITCH'
    },
    {
        icon: 'system',
        label: t('iconSystem'),
        name: 'SYSTEM'
    },
    {
        icon: 'system-fill',
        label: t('iconSystemFill'),
        name: 'SYSTEM_FILL'
    },
    {
        icon: 'tag',
        label: t('iconTag'),
        name: 'TAG'
    },
    {
        icon: 'tag-fill',
        label: t('iconTagFill'),
        name: 'TAG_FILL'
    },
    {
        icon: 'text-recognition',
        label: t('iconTextRecognition'),
        name: 'TEXT_RECOGNITION'
    },
    {
        icon: 'ticket',
        label: t('iconTicket'),
        name: 'TICKET'
    },
    {
        icon: 'ticket-fill',
        label: t('iconTicketFill'),
        name: 'TICKET_FILL'
    },
    {
        icon: 'time',
        label: t('iconTime'),
        name: 'TIME'
    },
    {
        icon: 'to-bottom',
        label: t('iconToBottom'),
        name: 'TO_BOTTOM'
    },
    {
        icon: 'to-left',
        label: t('iconToLeft'),
        name: 'TO_LEFT'
    },
    {
        icon: 'to-right',
        label: t('iconToRight'),
        name: 'TO_RIGHT'
    },
    {
        icon: 'to-top',
        label: t('iconToTop'),
        name: 'TO_TOP'
    },
    {
        icon: 'tool',
        label: t('iconTool'),
        name: 'TOOL'
    },
    {
        icon: 'tool-fill',
        label: t('iconToolFill'),
        name: 'TOOL_FILL'
    },
    {
        icon: 'topic',
        label: t('iconTopic'),
        name: 'TOPIC'
    },
    {
        icon: 'transaction-order',
        label: t('iconTransactionOrder'),
        name: 'TRANSACTION_ORDER'
    },
    {
        icon: 'transaction-order-fill',
        label: t('iconTransactionOrderFill'),
        name: 'TRANSACTION_ORDER_FILL'
    },
    {
        icon: 'transfer-data',
        label: t('iconTransferData'),
        name: 'TRANSFER_DATA'
    },
    {
        icon: 'translate',
        label: t('iconTranslate'),
        name: 'TRANSLATE'
    },
    {
        icon: 'truck',
        label: t('iconTruck'),
        name: 'TRUCK'
    },
    {
        icon: 'turn-off-bluetooth',
        label: t('iconTurnOffBluetooth'),
        name: 'TURN_OFF_BLUETOOTH'
    },
    {
        icon: 'unlock',
        label: t('iconUnlock'),
        name: 'UNLOCK'
    },
    {
        icon: 'unlock-fill',
        label: t('iconUnlockFill'),
        name: 'UNLOCK_FILL'
    },
    {
        icon: 'up',
        label: t('iconUp'),
        name: 'UP'
    },
    {
        icon: 'up-fill',
        label: t('iconUpFill'),
        name: 'UP_FILL'
    },
    {
        icon: 'upload',
        label: t('iconUpload'),
        name: 'UPLOAD'
    },
    {
        icon: 'user',
        label: t('iconUser'),
        name: 'USER'
    },
    {
        icon: 'vip',
        label: t('iconVip'),
        name: 'VIP'
    },
    {
        icon: 'vip-fill',
        label: t('iconVipFill'),
        name: 'VIP_FILL'
    },
    {
        icon: 'voice',
        label: t('iconVoice'),
        name: 'VOICE'
    },
    {
        icon: 'voice-fill',
        label: t('iconVoiceFill'),
        name: 'VOICE_FILL'
    },
    {
        icon: 'voice-off',
        label: t('iconVoiceOff'),
        name: 'VOICE_OFF'
    },
    {
        icon: 'volume-down',
        label: t('iconVolumeDown'),
        name: 'VOLUME_DOWN'
    },
    {
        icon: 'volume-down-fill',
        label: t('iconVolumeDownFill'),
        name: 'VOLUME_DOWN_FILL'
    },
    {
        icon: 'volume-mute',
        label: t('iconVolumeMute'),
        name: 'VOLUME_MUTE'
    },
    {
        icon: 'volume-mute-fill',
        label: t('iconVolumeMuteFill'),
        name: 'VOLUME_MUTE_FILL'
    },
    {
        icon: 'volume-notice',
        label: t('iconVolumeNotice'),
        name: 'VOLUME_NOTICE'
    },
    {
        icon: 'volume-notice-fill',
        label: t('iconVolumeNoticeFill'),
        name: 'VOLUME_NOTICE_FILL'
    },
    {
        icon: 'volume-small',
        label: t('iconVolumeSmall'),
        name: 'VOLUME_SMALL'
    },
    {
        icon: 'volume-small-fill',
        label: t('iconVolumeSmallFill'),
        name: 'VOLUME_SMALL_FILL'
    },
    {
        icon: 'volume-up',
        label: t('iconVolumeUp'),
        name: 'VOLUME_UP'
    },
    {
        icon: 'volume-up-fill',
        label: t('iconVolumeUpFill'),
        name: 'VOLUME_UP_FILL'
    },
    {
        icon: 'wallet',
        label: t('iconWallet'),
        name: 'WALLET'
    },
    {
        icon: 'wallet-fill',
        label: t('iconWalletFill'),
        name: 'WALLET_FILL'
    },
    {
        icon: 'waves-left',
        label: t('iconWavesLeft'),
        name: 'WAVES_LEFT'
    },
    {
        icon: 'wifi',
        label: t('iconWifi'),
        name: 'WIFI'
    },
    {
        icon: 'write',
        label: t('iconWrite'),
        name: 'WRITE'
    },
    {
        icon: 'zoom-in',
        label: t('iconZoomIn'),
        name: 'ZOOM_IN'
    },
    {
        icon: 'zoom-out',
        label: t('iconZoomOut'),
        name: 'ZOOM_OUT'
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
