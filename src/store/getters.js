export default {
  results(state) {
    return state.results;
  },
  token(state) {
    return state.token;
  },
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  toprepos(state) {
    return state.toprepos;
  },
  repository(state) {
    return state.repository;
  },
  readme(state) {
    return state.readme;
  },
  statistics(state) {
    return state.statistics;
  },
  commits(state) {
    return state.commits;
  },
  commitsLength(state) {
    return state.commits.length;
  },
  navigation(state) {
    return state.displayNavigation;
  },
  userrepos(state) {
    return state.userrepos;
  },
  commitTypes(state) {
    const types = {
      chores: 0,
      docs: 0,
      feat: 0,
      fix: 0,
      refactor: 0,
      style: 0,
      test: 0,
      notSemantic: 0,
    };
    const commits = state.commits;
    commits.forEach((commit) => {
      if (commit.commit.message.startsWith('chore:')) {
        types.chores += 1;
      } else if (commit.commit.message.startsWith('docs:')) {
        types.docs += 1;
      } else if (commit.commit.message.startsWith('feat:')) {
        types.feat += 1;
      } else if (commit.commit.message.startsWith('fix:')) {
        types.fix += 1;
      } else if (commit.commit.message.startsWith('refactor:')) {
        types.refactor += 1;
      } else if (commit.commit.message.startsWith('style:')) {
        types.style += 1;
      } else if (commit.commit.message.startsWith('test:')) {
        types.test += 1;
      } else {
        types.notSemantic += 1;
      }
    });
    return types;
  },
  commitTypesByUser(state) {
    const types = [];
    const commits = state.commits;
    commits.forEach((commit) => {
      let found = false;
      let foundId;
      for (let i = 0; i < types.length; i += 1) {
        if (types[i].id === commit.author.id) {
          found = true;
          foundId = i;
          break;
        }
      }
      if (found) {
        if (commit.commit.message.startsWith('chore:')) {
          types[foundId].chores += 1;
        } else if (commit.commit.message.startsWith('docs:')) {
          types[foundId].docs += 1;
        } else if (commit.commit.message.startsWith('feat:')) {
          types[foundId].feat += 1;
        } else if (commit.commit.message.startsWith('fix:')) {
          types[foundId].fix += 1;
        } else if (commit.commit.message.startsWith('refactor:')) {
          types[foundId].refactor += 1;
        } else if (commit.commit.message.startsWith('style:')) {
          types[foundId].style += 1;
        } else if (commit.commit.message.startsWith('test:')) {
          types[foundId].test += 1;
        } else {
          types[foundId].notSemantic += 1;
        }
      } else {
        types.push({
          id: commit.author.id,
          avatar_url: commit.author.avatar_url,
          login: commit.author.login,
          chores: 0,
          docs: 0,
          feat: 0,
          fix: 0,
          refactor: 0,
          style: 0,
          test: 0,
          notSemantic: 0,
        });
      }
    });
    return types;
  },
};
