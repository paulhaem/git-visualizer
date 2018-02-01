<template>
  <div class="commits">
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
  created() {
    const repodata = {
      owner: this.$route.params.username,
      repo: this.$route.params.reponame,
      token: this.$store.getters.token,
    };

    this.getCommits(repodata);
  },
  methods: {
    getCommits(repodata) {
      this.$store.dispatch('getCommits', repodata);
    }
  }
};
</script>

<style scoped>

</style>
