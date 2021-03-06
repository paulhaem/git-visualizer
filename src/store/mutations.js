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
  delReadme(state) {
    state.readme = '';
  },
  updateCommits(state, commits) {
    const newCommits = state.commits.concat(commits);
    state.commits = newCommits;
  },
  resetCommits(state) {
    state.commits = [];
  },
  delStatistics(state) {
    state.statistics = {
      contributors: 0,
      additions: 0,
      deletions: 0,
      commits: 0,
      loc: 0,
    };
  },
  setDisplayNavigation(state, flag) {
    state.displayNavigation = flag;
  },
  getUserRepos(state, response) {
    state.userrepos = response.data;
  },
  delCommits(state) {
    state.commits = [];
  },
};
