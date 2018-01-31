<template>
  <div class="sidebar">
    <Login></Login>
  </div>
</template>

<script>
import Login from './Login';

export default {
  name: 'Sidebar',
  components: {
    Login,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar {
  width: 300px;
  height: 700px;

  flex-shrink: 0;
}
</style>
