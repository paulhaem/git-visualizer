export default {
  getResults(state, response) {
    state.results = response.data.items;
  },
  addTopRepo(state, repo) {
    state.toprepos.push(repo);
  },
};
