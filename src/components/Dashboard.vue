<template>
  <div class="dashboard">
    Dashboard
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  mounted() {
    this.$store.commit('setDisplayNavigation', false);
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
