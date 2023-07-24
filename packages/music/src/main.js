// 引入vue
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// 引入Element UI
import {
  Slider,
  Menu,
  Button,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Pagination,
  Loading
} from 'element-ui';

Vue.use(Slider);
Vue.use(Menu);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Loading);

// 引入全局样式
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import 'nprogress/nprogress.css';
import '@/assets/fonts/iconfont.css';
import '@/styles/index.scss';

import CommonComponents from '@/components/common/index'
Vue.use(CommonComponents)

// 引入http接口
import http from '@/api/http';
Vue.prototype.$http = http;

// 引入一些工具方法
import tools from '@/utils/tools';
Vue.prototype.$tools = tools;

// 引入过滤器
import filters from '@/utils/filters';
Vue.use(filters);

// 关闭生成环境的提示
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App,
  render: (h) => h(App),
  components: {
    App
  }
}).$mount('#app');
