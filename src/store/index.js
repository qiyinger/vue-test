import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import systemInfo from './modules/management/systemInfo'
import apiInfo from './modules/management/apiInfo'
import apiApply from './modules/management/apiApply'
import application from './modules/management/application'
import microservice from './modules/management/microservice'
import microserviceVersion from './modules/management/microserviceVersion';
import route from './modules/management/route';
import serviceInstance from './modules/management/serviceInstance';
import strategyCall from './modules/management/strategyCall';
import strategyIp from './modules/management/strategyIp';
import gateway from './modules/management/gateway';
import apm from './modules/management/apm';

Vue.use(Vuex)

// 使用vuex记得在main.js中注册store

export default new Vuex.Store({
  modules: {
    d2admin,
    systemInfo,
    apiInfo,
    apiApply,
    application,
    microservice,
    microserviceVersion,
    route,
    serviceInstance,
    strategyCall,
    strategyIp,
    gateway,
    apm,
  }
})
