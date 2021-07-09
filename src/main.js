import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from "./languages";
// 样式
import "normalize.css";
import "./styles/index.less";

// 导入全部svg
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(require.context("./assets/icons", true, /\.svg$/));

const app = createApp(App)
  .use(store)
  .use(VueI18n)
  .use(router);
// .use(VueLazyLoad);

// 全局指令
import { clipboard } from "./direactives/index";

app.directive("clipboard", clipboard);

// 全局注册组件
import SvgIcon from "./components/SvgIcon";
import Header from "./components/Header";
import TeButton from "./components/Button";

app
  .component(SvgIcon.name, SvgIcon)
  .component(Header.name, Header)
  .component(TeButton.name, TeButton);

// 按需引入vant-ui
import {
  Locale,
  Button,
  Swipe,
  SwipeItem,
  Progress,
  Form,
  Picker,
  Field,
  Popup,
  Icon,
  Uploader,
  DatetimePicker,
  Sticky,
  ImagePreview,
  ActionSheet,
  Tab,
  Tabs,
  Cascader,
  CellGroup,
  Cell,
  Toast,
  Image,
  Dialog,
  CountDown,
  Row,
  Col,
  Lazyload,
  Collapse,
  CollapseItem,
  Overlay,
  Loading,
} from "vant";
import enUS from "vant/es/locale/lang/en-US";
import zhCN from "vant/es/locale/lang/zh-CN";
import { WARNING_COLOR } from "@/constants";

const IsLanguage = window.navigator.language === "zh-CN";

// 根据本地语言环境切换Vant组件的语言
if (IsLanguage) {
  Locale.use("zh-CN", zhCN);
} else {
  Locale.use("en-US", enUS);
}

Toast.setDefaultOptions(IsLanguage ? "加载" : "loading", {
  forbidClick: true,
  duration: 0,
  message: IsLanguage ? "加载..." : "loading...",
});
Dialog.setDefaultOptions({
  confirmButtonText: IsLanguage ? "确定" : "OK",
  cancelButtonText: IsLanguage ? "取消" : "Cancel",
  confirmButtonColor: WARNING_COLOR,
});

app
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Progress)
  .use(Form)
  .use(Picker)
  .use(Field)
  .use(Popup)
  .use(Icon)
  .use(Uploader)
  .use(DatetimePicker)
  .use(Sticky)
  .use(ImagePreview)
  .use(ActionSheet)
  .use(Tab)
  .use(Image)
  .use(Cascader)
  .use(CellGroup)
  .use(Cell)
  .use(Toast)
  .use(Dialog)
  .use(CountDown)
  .use(Row)
  .use(Col)
  .use(Tabs)
  .use(Lazyload)
  .use(Collapse)
  .use(CollapseItem)
  .use(Overlay)
  .use(Loading);

app.mount("#app");

//回调函数
// function receiveMessageFromIndex(event) {
//   console.log("receiveMessageFromIndex", event);
// }

// //监听message事件
// window.addEventListener("message", receiveMessageFromIndex, false);
