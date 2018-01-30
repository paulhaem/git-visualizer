import axios from 'axios';

export default {
  getResults(context, query) {
    // eslint-disable-next-line
    const url = 'https://api.github.com/search/repositories?q=' + query + '&client_id=ebadac8723557acc7f73&client_secret=9c01d3910c5c8ae58e3c332e559f4e4fe101184e';
    axios.get(url).then((response) => {
      // console.log(response.data.items);
      context.commit('getResults', response);
    });
  },
  getTopRepos(context) {
    // get vue
    let url = 'https://api.github.com/repos/vuejs/vue?client_id=ebadac8723557acc7f73&client_secret=9c01d3910c5c8ae58e3c332e559f4e4fe101184e';
    axios.get(url).then((response) => {
      // console.log(response.data);
      context.commit('addTopRepo', response.data);
    });
    // get react
    url = 'https://api.github.com/repos/facebook/react?client_id=ebadac8723557acc7f73&client_secret=9c01d3910c5c8ae58e3c332e559f4e4fe101184e';
    axios.get(url).then((response) => {
      context.commit('addTopRepo', response.data);
    });
    // get angular
    url = 'https://api.github.com/repos/angular/angular?client_id=ebadac8723557acc7f73&client_secret=9c01d3910c5c8ae58e3c332e559f4e4fe101184e';
    axios.get(url).then((response) => {
      context.commit('addTopRepo', response.data);
    });
  },
  getRepository(context, repodata) {
    const url = `https://api.github.com/repos/${repodata.owner}/${repodata.repo}?client_id=ebadac8723557acc7f73&client_secret=9c01d3910c5c8ae58e3c332e559f4e4fe101184e`;
    axios.get(url).then((response) => {
      context.commit('getRepository', response.data);
    });
  },
  getReadMe(context, repodata) {
    const url = `https://api.github.com/repos/${repodata.owner}/${repodata.repo}/readme?client_id=ebadac8723557acc7f73&client_secret=9c01d3910c5c8ae58e3c332e559f4e4fe101184e`;
    axios.get(url).then((response) => {
      context.commit('getReadMe', response.data);
    });
  },
};
