import axios from 'axios';
import parse from 'parse-link-header';
import clientinfo from './clientinfo';

export default {
  getResults(context, query) {
    const url = `https://api.github.com/search/repositories?q=${query}&client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
    axios.get(url).then((response) => {
      context.commit('getResults', response);
    });
  },
  getUser(context, token) {
    const url = 'https://api.github.com/user';

    axios.get(url, {
      params: {
        access_token: token,
      },
    }).then((response) => {
      context.commit('getUser', response);
    });
  },
  getTopRepos(context) {
    // get vue
    let url = `https://api.github.com/repos/vuejs/vue?client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
    axios.get(url).then((response) => {
      context.commit('addTopRepo', response.data);
    });
    // get react
    url = `https://api.github.com/repos/gohugoio/hugo?client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
    axios.get(url).then((response) => {
      context.commit('addTopRepo', response.data);
    });
    // get angular
    url = `https://api.github.com/repos/nuxt/nuxt.js?client_id=${clientinfo.client_id}&client_secret=${clientinfo.client_secret}`;
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
  getCommits(context, repodata) {
    const token = repodata.token;
    let commits = [];
    const url = `https://api.github.com/repos/${repodata.owner}/${repodata.repo}/commits`;

    // Initial API call
    const curPage = 1;
    let lastPage = 1;

    axios.get(url, {
      params: {
        client_id: clientinfo.client_id,
        client_secret: clientinfo.client_secret,
        // access_token: token,
        per_page: 100,
      },
    }).then((response) => {
      console.log(response);
      // add found commits to the commits array
      commits = commits.concat(response.data);
      if (response.headers.link) {
        // parse new link object
        const link = response.headers.link;
        const linkParsed = parse(link);

        // determine last page number
        if ('last' in linkParsed) {
          lastPage = parseInt(linkParsed.last.page, 10);
        }
        const payload = {
          commits,
          url: linkParsed.next.url,
          curPage: curPage + 1,
          lastPage,
        // token,
        };

        context.dispatch('recursiveGetCommits', payload);
      } else {
        context.commit('setCommits', commits);
      }
    });

    // context.commit('getUser', commits);
  },
  recursiveGetCommits(context, payload) {
    axios.get(payload.url, {
      params: {
        // access_token: payload.token,
        per_page: 100,
      },
    }).then((response) => {
      // add found commits to the commits array
      const newCommits = payload.commits.concat(response.data);

      // parse new link object
      const link = response.headers.link;
      const linkParsed = parse(link);

      if (payload.curPage < payload.lastPage) {
        const newPayload = {
          context,
          commits: newCommits,
          url: linkParsed.next.url,
          curPage: payload.curPage + 1,
          lastPage: payload.lastPage,
          // token: payload.token,
        };
        context.dispatch('recursiveGetCommits', newPayload);
      } else if (payload.curPage === payload.lastPage) {
        context.commit('setCommits', newCommits);
      }
    });
  },
  getUserRepos(context, token) {
    const url = 'https://api.github.com/user/repos?sort=updated';
    axios.get(url, {
      params: {
        access_token: token,
      },
    }).then((response) => {
      context.commit('getUserRepos', response);
    });
  },
};
