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
    toprepos: [],
    repository: '',
    readme: '',
    statistics: {
      contributors: 0,
      additions: 0,
      deletions: 0,
      commits: 0,
      loc: 0,
    },
  },
  getters,
  mutations,
  actions,
});
