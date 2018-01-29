<template>
  <div class="header">
    <div class="logo">
      <h1>GitVisualizer</h1>
    </div>
    <Navigation/>
    <Search/>
  </div>
</template>

<script>
import Search from './Search';
import Navigation from './Navigation';

export default {
  name: 'Header',
  components: {
    Navigation,
    Search,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  padding-left: 10%;
  padding-right: 10%;
}
.logo {
  background-color: #652676;
  color: white;
  width: 300px;
}
h1 {
  margin: 0;
  line-height: 2em;
}
</style>
