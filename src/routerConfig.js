/* eslint-disable */
// 工具
import util from '@/libs/util.ice'; // 页面和布局

import Index from './pages/Index';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import Demo1 from './pages/Demo1';
import Demo2 from './pages/Demo2';
import SystemInfo from './pages/systemInfo';
import Application from './pages/application';
import Microservice from './pages/microservice';
import MicroserviceDetail from './pages/microservice/components/microservice-detail';
import SystemDetail from './pages/systemInfo/components/system-detail';
import MicroserviceVersionDetail from './pages/microserviceVersion/components/version-detail';
import ApiInfo from './pages/apiInfo';
import RouteDetail from './pages/route/components/route-detail';
import ApiApply from './pages/apiApply';
import Route from './pages/route';
import StrategyIp from './pages/strategyIp';
import StrategyCall from './pages/strategyCall';
import Gateway from './pages/gateway';
import GatewayDetail from './pages/gateway/component/gateway-detail';
import DashBoard from './pages/DashBoard';
import HeaderAside from './layouts/HeaderAside'; // 变量名 routerConfig 为 iceworks 检测关键字
// ice 会自动在这个变量下添加路由数据
// 请不要修改名称
// 备注 ice 自动添加的路由记录是以下格式
// {
//   path: '/page4',
//   layout: d2LayoutMain,
//   component: 4
// }
// 如果不指定 name 字段，会根据 path 生成 name = page-demo1
// 转换规则见 util.recursiveRouterConfig 中 path2name 方法
// meta 字段会和默认值使用 Object.assign 合并
// 如果不指定 meta.name 的话，name 字段会使用和上面路由 name 一样的取值逻辑
// 下面两个页面就是对比 你可以分别观察两个页面上显示的路由数据差异

const routerConfig = [
  // 首页 必须 name:index
  {
    path: '/',
    name: 'index',
    layout: HeaderAside,
    component: Index,
  },
  {
    path: '/apiApply',
    layout: HeaderAside,
    component: ApiApply,
  },
  {
    path: '/demo1',
    name: 'demo1',
    layout: HeaderAside,
    component: Demo1,
    meta: {
      requiresAuth: true,
      title: '演示 1',
    },
  },
  {
    path: '/demo2',
    layout: HeaderAside,
    component: Demo2,
  }, // 刷新页面 必须保留
  {
    path: '/refresh',
    name: 'refresh',
    layout: HeaderAside,
    hidden: true,
    component: {
      beforeRouteEnter(to, from, next) {
        next(vm => vm.$router.replace(from.fullPath));
      },

      render: h => h(),
    },
  },
  {
    path: '/systemInfo',
    layout: HeaderAside,
    component: SystemInfo,
    meta: {
      title: '系统',
    },
    children: [
      {
        path: '/detail',
        name: 'system-detail',
        layout: HeaderAside,
        component: SystemDetail,
        meta: {
          title: '系统详情',
        },
      },
    ],
  },
  {
    path: '/microservice',
    layout: HeaderAside,
    name: 'microservice',
    component: Microservice,
    meta: {
      title: '微服务',
    },
    children: [
      {
        path: '/detail',
        name: 'microservice-detail',
        layout: HeaderAside,
        component: MicroserviceDetail,
        meta: {
          title: '微服务详情',
        },
        children: [
          {
            path: '/version/detail',
            name: 'microserviceVersion-detail',
            layout: HeaderAside,
            component: MicroserviceVersionDetail,
            meta: {
              title: '微服务版本详情',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/application',
    layout: HeaderAside,
    component: Application,
    meta: {
      title: '应用',
    },
  }, // 页面重定向 必须保留
  {
    path: '/redirect/:route*',
    name: 'redirect',
    layout: HeaderAside,
    hidden: true,
    component: {
      beforeRouteEnter(to, from, next) {
        next(vm => vm.$router.replace(JSON.parse(from.params.route)));
      },

      render: h => h(),
    },
  },
  {
    path: '/apiInfo',
    layout: HeaderAside,
    component: ApiInfo,
  },
  {
    path: '/gateway',
    name: 'gateway',
    layout: HeaderAside,
    component: Gateway,
    meta: {
      title: '网关',
    },
    children: [
      {
        path: '/detail',
        name: 'gateway-detail',
        layout: HeaderAside,
        component: GatewayDetail,
        meta: {
          title: '网关详情',
        },
      },
    ],
  },
  {
    path: '/route',
    name: 'route',
    layout: HeaderAside,
    component: Route,
    meta: {
      title: '路由',
    },
    children: [
      {
        path: '/detail',
        name: 'route-detail',
        layout: HeaderAside,
        component: RouteDetail,
        meta: {
          title: '路由详情',
        },
      },
    ],
  },
  {
    path: '/strategyIp',
    layout: HeaderAside,
    component: StrategyIp,
  },
  {
    path: '/dashboard',
    layout: HeaderAside,
    component: DashBoard,
  },
]; // 不参与菜单显示的
// ice 不会处理这部分
// 但是这部分路由也会被注册
// 处理规则同 routerConfig

const routerConfigMenuOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  }, // 404
  {
    path: '*',
    component: Error404,
  },
]; // 导出全部路由设置
// 这个数据会在 router.js 中被扁平处理

export default util.recursiveRouterConfig([
  ...routerConfig,
  ...routerConfigMenuOut,
]); // 导出参与多标签页处理的路由设置
// 这个数据会在 mian.js 中使用

export const frameInRoutes = util.recursiveRouterConfig(routerConfig).map(e => {
  const route = e.children ? e.children[0] : e;
  return {
    path: e.path,
    name: route.name,
    hidden: route.hidden,
    meta: route.meta,
  };
});
