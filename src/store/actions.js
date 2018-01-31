import axios from 'axios';

export default {
  getResults(context, query) {
    // eslint-disable-next-line
    const url = 'https://api.github.com/search/repositories?q=' + query;
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
};
