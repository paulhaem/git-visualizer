import base64 from 'base-64';

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
  addTopRepo(state, repo) {
    state.toprepos.push(repo);
  },
  getRepository(state, repository) {
    state.repository = repository;
  },
  getReadMe(state, readme) {
    state.readme = base64.decode(readme.content);
  },
  getStatistics(state, data) {
    const contributors = data.length;
    let additions = 0;
    let deletions = 0;
    let commits = 0;
    Object.entries(data).forEach(
      // eslint-disable-next-line
      ([key, value]) => {
        // eslint-disable-next-line
        for (let week of value.weeks) {
          additions += week.a;
          deletions += week.d;
          commits += week.c;
        }
      },
    );
    state.statistics.contributors = contributors;
    state.statistics.additions = additions;
    state.statistics.deletions = deletions;
    state.statistics.commits = commits;
  },
  getLoC(state, data) {
    let loc = 0;
    // eslint-disable-next-line
    for (let week of data) {
      loc += week[1];
      loc -= week[2];
    }
    state.statistics.loc = loc;
  },
  delRepository(state) {
    console.log('deleting..');
    state.readme = '';
  },
};
