import HyTabBr from "./hy-tabBar/hy-tabBar.vue";
// 组件库
import HyAddressPicker from "./hy-address-picker/hy-address-picker.vue";
import HyAvatar from "./hy-avatar/hy-avatar.vue";
import HyBackTop from "./hy-back-top/hy-back-top.vue";
import HyBadge from "./hy-badge/hy-badge.vue";
import HyButton from "./hy-button/hy-button.vue";
import HyCard from "./hy-card/hy-card.vue";
import HyCell from "./hy-cell/hy-cell.vue";
import HyCheckButton from "./hy-check-button/hy-check-button.vue";
import HyCheckbox from "./hy-checkbox/hy-checkbox.vue";
import HyCountDown from "./hy-count-down/hy-count-down.vue";
import HyCountTo from "./hy-count-to/hy-count-to.vue";
import HyDatetimePicker from "./hy-datetime-picker/hy-datetime-picker.vue";
import HyDivider from "./hy-divider/hy-divider.vue";
import HyDropdown from "./hy-dropdown/hy-dropdown.vue";
import HyDropdownItem from "./hy-dropdown-item/hy-dropdown-item.vue";
import YkEmpty from "./hy-empty/hy-empty.vue";
import YkFloatButton from "./hy-float-button/hy-float-button.vue";
import HyFoldingPanel from "@/package/components/hy-folding-panel/hy-folding-panel.vue";
import HyForm from "@/package/components/hy-form-group/hy-form.vue";
import HyFormSimple from "@/package/components/hy-form/hy-form-simple.vue";
import HyFormItem from "./hy-form-item/hy-form-item.vue";
import HyGrid from "./hy-grid/hy-grid.vue";
import HyIcon from "./hy-icon/hy-icon.vue";
import HyImage from "./hy-image/hy-image.vue";
import HyInput from "./hy-input/hy-input.vue";
import HyLine from "./hy-line/hy-line.vue";
import HyLineProgress from "./hy-line-progress/hy-line-progress.vue";
import HyList from "./hy-list/hy-list.vue";
import HyLoading from "./hy-loading/hy-loading.vue";
import YkLogin from "./hy-login/hy-login.vue";
import HyModal from "./hy-modal/hy-modal.vue";
import HyNavbar from "./hy-navbar/hy-navbar.vue";
import HyNoticeBar from "./hy-notice-bar/hy-notice-bar.vue";
import HyNumberStep from "./hy-number-step/hy-number-step.vue";
import HyOverlay from "./hy-overlay/hy-overlay.vue";
import YkPrice from "./hy-price/hy-price.vue";
import HyPicker from "./hy-picker/hy-picker.vue";
import HyPopup from "./hy-popup/hy-popup.vue";
import HyQrcode from "./hy-qrcode/hy-qrcode.vue";
import HyRadio from "./hy-radio/hy-radio.vue";
import HyRate from "./hy-rate/hy-rate.vue";
import HyReadMore from "./hy-read-more/hy-read-more.vue";
// import HySafeBottom from "./hy-safe-bottom/hy-safe-bottom.vue";
import HyScrollList from "./hy-scroll-list/hy-scroll-list.vue";
import HySearch from "./hy-search/hy-search.vue";
import HySlider from "./hy-slider/hy-slider.vue";
import HyStatusBar from "./hy-status-bar/hy-status-bar.vue";
import HySteps from "./hy-steps/hy-steps.vue";
import HySubsection from "./hy-subsection/hy-subsection.vue";
import HySwiper from "./hy-swiper/hy-swiper.vue";
import HySwitch from "./hy-switch/hy-switch.vue";
import HyTabs from "./hy-tabs/hy-tabs.vue";
import HyTag from "./hy-tag/hy-tag.vue";
import HyTextarea from "./hy-textarea/hy-textarea.vue";
import HyTooltip from "./hy-tooltip/hy-tooltip.vue";
import HyTransition from "./hy-transition/hy-transition.vue";
import HyUpload from "./hy-upload/hy-upload.vue";
import HyWarn from "./hy-warn/hy-warn.vue";

const install = (Vue: any) => {
  Vue.component("hy-tabBar", HyTabBr);

  Vue.component("HyAddressPicker", HyAddressPicker);
  Vue.component("HyAvatar", HyAvatar);
  Vue.component("HyBackTop", HyBackTop);
  Vue.component("HyBadge", HyBadge);
  Vue.component("HyButton", HyButton);
  Vue.component("HyCard", HyCard);
  Vue.component("HyCell", HyCell);
  Vue.component("HyCheckButton", HyCheckButton);
  Vue.component("HyCheckbox", HyCheckbox);
  Vue.component("HyCountDown", HyCountDown);
  Vue.component("HyCountTo", HyCountTo);
  Vue.component("HyDatetimePicker", HyDatetimePicker);
  Vue.component("HyDivider", HyDivider);
  Vue.component("HyDropdown", HyDropdown);
  Vue.component("HyDropdownItem", HyDropdownItem);
  Vue.component("YkEmpty", YkEmpty);
  Vue.component("YkFloatButton", YkFloatButton);
  Vue.component("HyFoldingPanel", HyFoldingPanel);
  Vue.component("HyForm", HyForm);
  Vue.component("HyFormSimple", HyFormSimple);
  Vue.component("HyFormItem", HyFormItem);
  Vue.component("HyGrid", HyGrid);
  Vue.component("HyIcon", HyIcon);
  Vue.component("HyImage", HyImage);
  Vue.component("HyInput", HyInput);
  Vue.component("HyLine", HyLine);
  Vue.component("HyLineProgress", HyLineProgress);
  Vue.component("HyList", HyList);
  Vue.component("HyLoading", HyLoading);
  // Vue.component("YkLogin", YkLogin);
  Vue.component("HyModal", HyModal);
  Vue.component("HyNavbar", HyNavbar);
  Vue.component("HyNoticeBar", HyNoticeBar);
  Vue.component("HyNumberStep", HyNumberStep);
  Vue.component("HyOverlay", HyOverlay);
  Vue.component("YkPrice", YkPrice);
  Vue.component("HyPicker", HyPicker);
  Vue.component("HyPopup", HyPopup);
  Vue.component("HyQrcode", HyQrcode);
  Vue.component("HyRadio", HyRadio);
  Vue.component("HyRate", HyRate);
  Vue.component("HyReadMore", HyReadMore);
  Vue.component("HyScrollList", HyScrollList);
  Vue.component("HySearch", HySearch);
  Vue.component("HySlider", HySlider);
  Vue.component("HyStatusBar", HyStatusBar);
  Vue.component("HySteps", HySteps);
  Vue.component("HySubsection", HySubsection);
  Vue.component("HySwiper", HySwiper);
  Vue.component("HySwitch", HySwitch);
  Vue.component("HyTabs", HyTabs);
  Vue.component("HyTag", HyTag);
  Vue.component("HyTextarea", HyTextarea);
  Vue.component("HyTooltip", HyTooltip);
  Vue.component("HyTransition", HyTransition);
  Vue.component("HyUpload", HyUpload);
  Vue.component("HyWarn", HyWarn);
  // Vue.config.globalProperties.$dialog = myDialog;
};
export {
  install,
  HyAddressPicker,
  HyAvatar,
  HyBackTop,
  HyBadge,
  HyButton,
  HyCard,
  HyCell,
  HyCheckButton,
  HyCheckbox,
  HyCountDown,
  HyCountTo,
  HyDatetimePicker,
  HyDivider,
  HyDropdown,
  HyDropdownItem,
  YkEmpty,
  YkFloatButton,
  HyFoldingPanel,
  HyForm,
  HyFormSimple,
  HyFormItem,
  HyGrid,
  HyIcon,
  HyImage,
  HyInput,
  HyLine,
  HyLineProgress,
  HyList,
  HyLoading,
  // YkLogin,
  HyModal,
  HyNavbar,
  HyNoticeBar,
  HyNumberStep,
  HyOverlay,
  YkPrice,
  HyPicker,
  HyPopup,
  HyQrcode,
  HyRadio,
  HyRate,
  HyReadMore,
  HyScrollList,
  HySearch,
  HySlider,
  HyStatusBar,
  HySteps,
  HySubsection,
  HySwiper,
  HySwitch,
  HyTabs,
  HyTag,
  HyTextarea,
  HyTooltip,
  HyTransition,
  HyUpload,
  HyWarn,
};
