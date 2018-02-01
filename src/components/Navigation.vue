<template>
  <div class="navigation">
      <router-link v-if="isAuthenticated" class="nav-link" :to="{ name: 'Dashboard' }">
      Dashboard
      </router-link>
      <router-link v-if="navigation" class="nav-link" :to="{ name: 'Information', params: {
        username: repository.owner.login,
        reponame: repository.name }}
      ">
        Information
      </router-link>
      <router-link v-if="navigation" class="nav-link"  :to="{ name: 'Commits', params: {
        username: repository.owner.login,
        reponame: repository.name }}
      ">
        Commits
      </router-link>
      <router-link v-if="navigation" class="nav-link"  :to="{ name: 'Contributors', params: {
        username: repository.owner.login,
        reponame: repository.name }}
      ">
        Contributors
      </router-link>
  </div>
</template>

<script>

export default {
  name: 'Navigation',
  computed: {
    navigation() {
      return this.$store.getters.navigation;
    },
    repository() {
      return this.$store.getters.repository;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navigation {
  display: flex;
  flex-grow: 1;
  margin-left: 2em;
}
.nav-link {
  text-decoration: none;
  color: #888888;
  font-size: 1.2em;
  display: block;
  height: 100%;
  line-height: 3;
  padding-left: .5em;
  padding-right: .5em;
  margin-right: 1em;
  font-weight: bold;
  border-bottom: 5px solid #ffffff;
}
.nav-link:hover {
  border-bottom: 5px solid #888888;
}
.router-link-active, .router-link-active:hover {
  color: #845c9c;
  border-bottom: 5px solid #8459c9;
}
</style>
