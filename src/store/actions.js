import axios from 'axios';

export default {
  getResults(context, query) {
    // eslint-disable-next-line
    const url = 'https://api.github.com/search/repositories?q=' + query;
    axios.get(url).then((response) => {
      // console.log(response.data.items);
      context.commit('getResults', response);
    });
  },
  getTopRepos(context) {
    // get vue
    let url = 'https://api.github.com/repos/vuejs/vue';
    axios.get(url).then((response) => {
      context.commit('addTopRepo', response.data);
    });
    // get react
    url = 'https://api.github.com/repos/facebook/react';
    axios.get(url).then((response) => {
      context.commit('addTopRepo', response.data);
    });
    // get angular
    url = 'https://api.github.com/repos/angular/angular';
    axios.get(url).then((response) => {
      context.commit('addTopRepo', response.data);
    });
  },
};
