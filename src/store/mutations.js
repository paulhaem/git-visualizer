export default {
  getResults(state, response) {
    state.results = response.data.items;
  },
  addTopRepo(state, repo) {
    state.toprepos.push(repo);
  },
  getRepository(state, repository) {
    state.repository = repository;
  },
  getReadMe(state, readme) {
    state.readme = readme;
  },
};
