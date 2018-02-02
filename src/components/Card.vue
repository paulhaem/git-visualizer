<template>
  <div class="card">
    <router-link :to="{ name: 'Information', params: { username: data.owner.login, reponame: data.name }}">
      <div class="title" >
        <p class="name">{{ data.full_name }}</p>
        <font-awesome-icon class="arrow" size="2x" :icon="['far', 'angle-right']"  />
      </div>
    </router-link>
    <p v-if="data.description" class="description" >{{ data.description }}</p>
    <p v-else>No Description.</p>
    <div class="footer">
      <p v-if="data.language" class="language" :class= "data.language.toLowerCase()" >
        {{ data.language }}
      </p>
      <p v-else></p>
      <p class="stars" v-if="data.stargazers_count > 999" >
        <font-awesome-icon :icon="['far', 'star']" />
        {{ Math.round(data.stargazers_count/100)/10 }}k
      </p>
      <p class="stars" v-else>
        <font-awesome-icon :icon="['far', 'star']" />
        {{ data.stargazers_count }}
      </p>
    </div>
  </div>
</template>

<script>
/* eslint max-len: "off" */
export default {
  name: 'Card',
  props: ['data'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  border: none;
  border-radius: 5px;
  height: 175px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
}
.description {
  width: 100%;
  line-height: 1.5em;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 1em;
  padding-right: 1em;
  flex-shrink: 0;
}
.name {
  background-color: #845C9C;
  color: white;
  margin-top: 0;
  white-space: nowrap;
  padding-left: 2em;
  padding-right: 2em;
  line-height: 3em;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  text-decoration: none;
}
.title {
  position: relative;
}
.card a {
  text-decoration: none;
}
.arrow {
  position: absolute;
  top: .25em;
  right: .4em;
  color: white;
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
}

/* Language Coloring */
.language { /* fallback pink */
  color: #ff69b4;
}


.javascript {
  color: #f2be43;
}
.html {
  color: #e34c26;
}
.php {
  color: #4F5D95;
}
.typescript {
  color: orange;
}
.coffeescript {
  color: #777777;
}
.haskell {
  color: #00cccc;
}
.java {
  color: #cc00cc;
}
.go {
  color: #aacc00;
}
.ruby {
  color: red;
}
.shell {
  color: grey;
}
.lua {
  color: blue;
}
.python {
  color: green;
}
.rust {
  color: brown;
}
.css {
  color: purple;
}
.objective-j {
  color: #cc77cc;
}
.scala {
  color: #cc0033;
}
.dart {
  color: #cc7700;
}
.vue {
  color: #13a7fc;
}
.c {
  color: #c9739c;
}
.objective-c {
  color: #00cf1f;
}
</style>
