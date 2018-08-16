import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Locales from './locale'
import en from 'iview/dist/locale/en-US'
import zh from 'iview/dist/locale/zh-CN'

Vue.use(VueI18n)

// 自动设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
const lang = window.localStorage.lang || localLang || 'zh-CN'

Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => {}

// 多语言配置
const locales = Locales
const messages = {
  'en-US': Object.assign(en, locales['en-US']),
  'zh-CN': Object.assign(zh, locales['zh-CN'])
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang,
  messages
})

export default i18n
