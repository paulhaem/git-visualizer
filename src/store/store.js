import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

// eslint-disable-next-line
export const store = new Vuex.Store({
  state: {
    results: [],
    token: '',
    user: {},
    isAuthenticated: false,
  },
  getters,
  mutations,
  actions,
});
