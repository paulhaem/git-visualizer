<template>
  <div class="contributors">

  </div>
</template>

<script>
export default {
  name: 'Contributors',
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
    this.getCommits(repodata);
    this.$store.commit('setDisplayNavigation', true);
  },
  beforeDestroy() {
    this.$store.commit('delCommits');
  },
  methods: {
    getCommits(repodata) {
      this.$store.dispatch('getCommits', repodata);
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
