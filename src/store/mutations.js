export default {
  getResults(state, response) {
    state.results = response.data.items;
  },
  setToken(state, token) {
    state.token = token;
  },
  getUser(state, user) {
    state.user = user.data;
  },
  setAuthentication(state, flag) {
    state.isAuthenticated = flag;
  },
};
