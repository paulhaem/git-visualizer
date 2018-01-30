export default {
  getResults(state, response) {
    state.results = response.data.items;
  },
};
