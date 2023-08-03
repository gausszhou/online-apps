// 引入vue
import "@/styles/index.scss";
import Vue from 'vue';
import "winbox";
import App from './App';

new Vue({
  el: '#app',
  render: h => h(App),
  components: {
    App
  }
}).$mount("#app");


