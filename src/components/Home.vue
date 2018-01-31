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
  <div class="card">
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
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 100%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  margin: 15px;
}
.two {
  width: calc(50% - 30px);
  display: flex;
}
.h2wrapper {
  background-color: #845C9C;
}
.card {
  text-align: center;
}
.wrapper {
  display: flex;
  justify-content: space-around;
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
