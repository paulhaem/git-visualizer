<template>
  <div class="Search">
    <form v-on:submit.prevent="getResult(query)">
      <input class="searchfield" type="text" placeholder="Search Repositories" v-model="query" />
    </form>
  </div>
</template>

<script>
import router from '../router';

export default {
  name: 'Search',
  data() {
    return {
      query: '',
    };
  },
  methods: {
    getResult(query) {
      if (router.name === 'Results') {
        // eslint-disable-next-line
        console.log('replacing');
        router.replace({ name: 'user-view', params: { data: query } });
      } else {
        router.push({ name: 'Results', params: { data: query } });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchfield {
  background-color: #f5f5f5;
  border: none;
  height: 3em;
  border-radius: 1.5em;
  padding-left: 1em;
}
</style>
