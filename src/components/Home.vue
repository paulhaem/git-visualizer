<template>
<div class="home">
  <div class="card intro">
    <h1>GitVisualizer</h1>
    <p>... is a way to give insights of the status and workflow of someones project by just looking at its repository.</p>
  </div>
  <div class="card two">
    <div class="h2wrapper">
      <h2>Login</h2>
    </div>
    <p>On the left you have the possibility to log into your GitHub / GitLab Account and view corresponding statistics and visualizations.</p>
  </div>
  <div class="card two">
    <div class="h2wrapper">
      <h2>Search</h2>
    </div>
    <p>On the top you can search for repositories of other users and get new knowledge by comparing workflows and statistics.</p>
  </div>
  <div class="card info">
    <p>Hop right into one of the following top repositories and have a look for yourself:</p>
  </div>
  <div class="wrapper">
    <Card v-for="toprepo in toprepos.slice(0,3)" :key="toprepo.id" :data="toprepo"/>
  </div>
</div>
</template>

<script>
import Card from './Card';
/* eslint max-len: "off" */
export default {
  name: 'Home',
  components: {
    Card,
  },
  computed: {
    toprepos() {
      return this.$store.getters.toprepos;
    },
  },
  mounted() {
    this.$store.dispatch('getTopRepos');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  margin-left: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 8em 175px 3em 1fr;
  grid-row-gap: 15px;
  grid-column-gap: 15px;
}
.intro {
  grid-column-start: span 2;
}
.info {
  grid-column-start: span 2;
}
.card {
  background-color: #ffffff;
  width: 100%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
}
.two {
  width: 100%;
  display: flex;
}
.h2wrapper {
  background-color: #845C9C;
  border-radius: 5px 0 0 5px;
}
.card {
  text-align: center;
}
.wrapper {
  grid-column-start: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 175px;
  grid-column-gap: 15px;
}
h1 {
  color: #845C9C;
}
h2 {
  color: #ffffff;
  transform: rotate(-90deg)  translateY(.4em) translateX(-1em);;
  transform-origin: center center;
  width: 100%;
  height: 2em;

}
p {
  color: #888888;
}
.card > p {
  font-weight: bold;
}
.two > p {
  font-weight: normal;
}

</style>
