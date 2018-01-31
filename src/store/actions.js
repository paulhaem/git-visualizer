import axios from 'axios';
import clientinfo from './clientinfo';

export default {
  getResults(context, query) {
    const url = `https://api.github.com/search/repositories?q=${query}&client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
    axios.get(url).then((response) => {
      context.commit('getResults', response);
    });
  },
  getTopRepos(context) {
    // get vue
    let url = `https://api.github.com/repos/vuejs/vue?client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
    axios.get(url).then((response) => {
      context.commit('addTopRepo', response.data);
    });
    // get react
    url = `https://api.github.com/repos/facebook/react?client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
    axios.get(url).then((response) => {
      context.commit('addTopRepo', response.data);
    });
    // get angular
    url = `https://api.github.com/repos/angular/angular?client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
    axios.get(url).then((response) => {
      context.commit('addTopRepo', response.data);
    });
  },
  getRepository(context, repodata) {
    const url = `https://api.github.com/repos/${repodata.owner}/${repodata.repo}?client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
    axios.get(url).then((response) => {
      context.commit('getRepository', response.data);
    });
  },
  getReadMe(context, repodata) {
    const url = `https://api.github.com/repos/${repodata.owner}/${repodata.repo}/readme?client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
    axios.get(url).then((response) => {
      context.commit('getReadMe', response.data);
    });
  },
  getStatistics(context, repodata) {
    let url = `https://api.github.com/repos/${repodata.owner}/${repodata.repo}/stats/contributors?client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
    axios.get(url).then((response) => {
      context.commit('getStatistics', response.data);
    });
    url = `https://api.github.com/repos/${repodata.owner}/${repodata.repo}/stats/code_frequency?client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
    axios.get(url).then((response) => {
      context.commit('getLoC', response.data);
    });
  },
};
