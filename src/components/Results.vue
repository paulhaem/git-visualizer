<template>
  <div class="results" v-if="results">
    <Card v-for="result in results.slice(0,9)" :key="result.id" :data="result"/>
  </div>
</template>

<script>
import axios from 'axios';
import Card from './Card';

export default {
  name: 'Results',
  components: {
    Card,
  },
  data() {
    return {
      results: '',
    };
  },
  mounted() {
    this.getResults(this.$route.params.data);
  },
  methods: {
    getResults(data) {
      // eslint-disable-next-line
      const url = 'https://api.github.com/search/repositories?q=' + data;
      axios.get(url).then((response) => {
        this.results = response.data.items;
      });
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
  height: 700px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: space-around;
}
</style>
