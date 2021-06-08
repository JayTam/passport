//多语言
import { createI18n } from "vue-i18n";

//注册i8n实例并引入语言文件
const i18n = createI18n({
  locale: window.navigator.language === "zh-CN" ? "zh-CN" : "en-US",
  // locale: window.navigator.language, //默认显示的语言
  messages: {
    "zh-CN": require("./zh/index.js"),
    "en-US": require("./en/index.js"),
    en: require("./en/index.js"),
    id: require("./in/index.js")
  }
});
export default i18n; //将i18n暴露出去，在main.js中引入挂载
