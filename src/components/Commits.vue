<template>
  <div class="commits">
    Commits
  </div>
</template>

<script>
export default {
  name: 'Commits',
  mounted() {
    this.$store.commit('setDisplayNavigation', true);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
