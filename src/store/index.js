import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import systemInfo from './modules/management/systemInfo'
import application from './modules/management/application'
import microservice from './modules/management/microservice'

Vue.use(Vuex)

// 使用vuex记得在main.js中注册store

export default new Vuex.Store({
  modules: {
    d2admin,
    systemInfo,
    application,
    microservice,
  }
})
