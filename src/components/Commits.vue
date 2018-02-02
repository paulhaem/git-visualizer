<template>
  <div class="commits" v-if="commits">
    <p v-for="commit in commits" :key="commit.id">{{ commit.commit.message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Commits',
  computed: {
    commits() {
      return this.$store.getters.commits;
    }
  },
  beforeMount() {
    const repodata = {
      owner: this.$route.params.username,
      repo: this.$route.params.reponame,
      token: this.$store.getters.token,
    };
    this.getRepository(repodata);
    this.getCommits(repodata);
    this.$store.commit('setDisplayNavigation', true);
  },
  beforeDestroy() {
    this.$store.commit('delCommits');
  },
  methods: {
    getRepository(repodata) {
      this.$store.dispatch('getRepository', repodata);
    },
    getCommits(repodata) {
      this.$store.dispatch('getCommits', repodata);
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route.params.reponame'(newReponame, oldReponame) {
      const repodata = {
        owner: this.$route.params.username,
        repo: this.$route.params.reponame,
      };
      this.$store.commit('delCommits');
      this.getCommits(repodata);
    },
  },
};
</script>

<style scoped>

</style>
