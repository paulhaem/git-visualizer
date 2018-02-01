<template>
  <div class="contributors">
    Contributers
  </div>
</template>

<script>
export default {
  name: 'Contributors',
  mounted() {
    this.$store.commit('setDisplayNavigation', true);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
