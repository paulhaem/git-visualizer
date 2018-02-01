<template>
  <div class="results">
    <div class="grid" v-if="results">
      <Card class="card" v-for="result in results.slice(0,counter)" :key="result.id" :data="result"/>
    </div>
    <button class="load" v-if="counter <= results.length" v-on:click="counter += 9">Load more...</button>
  </div>
</template>

<script>
import Card from './Card';

export default {
  name: 'Results',
  components: {
    Card,
  },
  computed: {
    results() {
      return this.$store.getters.results;
    },
  },
  data () {
    return {
      counter: 9
    }
  },
  mounted() {
    this.$store.commit('setDisplayNavigation', false);
    this.getResults(this.$route.params.data);
  },
  methods: {
    getResults(query) {
      this.$store.dispatch('getResults', query);
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route.params.data'(newData, oldData) {
      this.getResults(newData);
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
