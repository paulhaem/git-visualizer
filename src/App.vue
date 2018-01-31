<template>
  <div id="app">
    <Header/>
    <div id="wrapper">
      <Sidebar/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style>

body {
  background-color: #EFF2F6;

  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
}
#wrapper {
  display: flex;
  padding-top: 15px;
  padding-left: 10%;
  padding-right: 10%;
}
</style>
