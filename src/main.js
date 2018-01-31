// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import regular from '@fortawesome/fontawesome-pro-regular';

import App from './App';
import router from './router';
import { store } from './store/store';
import session from './session';

fontawesome.library.add(regular); // Use any icon from the Solid style

Vue.component('font-awesome-icon', FontAwesomeIcon); // Use the icon component anywhere in the app

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  session,
  components: {
    App,
  },
  template: '<App/>',
});
