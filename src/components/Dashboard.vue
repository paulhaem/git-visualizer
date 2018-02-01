<template>
  <div class="dashboard">
    <div class="grid" v-if="userrepos">
      <Card class="card" v-for="repo in userrepos.slice(0,counter)" :key="repo.id" :data="repo"/>
    </div>
    <button class="load" v-if="counter <= userrepos.length" v-on:click="counter += 9">Load more...</button>
  </div>
</template>

<script>
import Card from './Card';
/* eslint max-len: "off" */
export default {
  name: 'Dashboard',
  components: {
    Card,
  },
  computed: {
    userrepos() {
      return this.$store.getters.userrepos;
    },
  },
  data() {
    return {
      counter: 9,
    };
  },
  mounted() {
    this.$store.commit('setDisplayNavigation', false);
    if(this.$store.getters.token) {
      this.getUserRepos(this.$store.getters.token);
    }
  },
  methods: {
    getUserRepos(token) {
      this.$store.dispatch('getUserRepos', token);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  padding: 0 7.5px;
}
.card {
  margin: 0 7.5px 15px 7.5px;
  flex-grow: 0;
  width: calc(100% * (1/3) - 16px);
}
.load {
  border-radius: 5px;
  background-color: #845c9c;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.2em;
  padding: 1em 2em;
  border: 5px solid #845c9c;
  margin-bottom: 3em;
}
.load:hover {
  cursor: pointer;
  background-color: #ffffff;
  color: #845c9c;
}
</style>
