<template>
  <div class="results" v-if="results">
    <Card v-for="result in results.slice(0,9)" :key="result.id" :data="result"/>
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
.results {
  margin-left: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 175px 175px 175px;
  grid-row-gap: 15px;
  grid-column-gap: 15px;
}
</style>
