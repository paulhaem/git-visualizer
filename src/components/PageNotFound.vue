<template>
  <div class="pageNotFound">
    <div class="card">
      <div class="cardheader">
        <h1>404 - Page not found</h1>
      </div>
      <div class="content">
        <p class="robot">🤖</p>
        <p>"This is not the page you were looking for. Head back to home or search for repositories on the top."</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  mounted() {
    this.$store.commit('setDisplayNavigation', false);
  },
};
</script>

<style scoped>

.card {
  width: 100%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  margin: 0 15px 15px 15px;
  background-color: #ffffff;
}
.pageNotFound h1 {
  color: white;
  line-height: 1.5;
  text-align: left;
  padding-left: .5em;
  margin-top: 0;
}
.cardheader {
  border-radius: 5px 5px 0 0;
  background-color: #845C9C;
  position: relative;
}
.content {
  font-size: 1.2em;
  color: #888888;

  padding: 0 1em .5em 1em;
}

.robot {
  font-size: 2em;
}

</style>
