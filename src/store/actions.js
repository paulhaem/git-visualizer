import axios from 'axios';

export default {
  getResults(context, query) {
    // eslint-disable-next-line
    const url = 'https://api.github.com/search/repositories?q=' + query;
    axios.get(url).then((response) => {
      context.commit('getResults', response);
    });
  },
};
