import "@lib/scss/common.scss"
import "@lib/scss/animation.scss"
import axios from "@plg/axios/axios"
import moment from "moment"
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
export default {
  install(Vue) {
    Vue.prototype.axios = axios;
    Vue.prototype.moment = moment;
    Vue.prototype.randomNum = (minNum,maxNum) => {
      return Math.random()*(maxNum-minNum+1)+minNum; 
    }
  }
}