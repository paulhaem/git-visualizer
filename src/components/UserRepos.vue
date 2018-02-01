<template>
  <div class="UserRepos" v-if="userrepos">
    <h3>Your Repositories</h3>
    <ul class="yourrepos">
      <li v-for="repo in userrepos.slice(0,5)">
        <router-link :to="{ name: 'Information',
                            params: {
                              username: repo.owner.login,
                              reponame: repo.name
                            }
                          }"
        >
          {{ repo.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserRepos',
  computed: {
    userrepos() {
      return this.$store.getters.userrepos;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  padding-top: 1em;
  margin: 0;
  color: #888888;
}
.yourrepos {
  margin: 1em;
  padding-bottom: 1em;
  list-style: circle;
  color: #845c9c;
  text-align: left;
}
.yourrepos li:hover {
  list-style: disc;
}
.yourrepos a {
  text-decoration: none;
  font-weight: bold;
  color: #845c9c;
  line-height: 1.5;
  text-align: left;
}
</style>
