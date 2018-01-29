<template>
  <div class="card">
    <p class="name">{{ data.full_name }}</p>
    <p v-if="data.description" class="description" >{{ data.description }}</p>
    <p v-else>No Description.</p>
    <div class="footer">
      <p v-if="data.language" class="language" :class= "data.language.toLowerCase()" >
        {{ data.language }}
      </p>
      <p v-else></p>
      <p class="stars" v-if="data.stargazers_count > 999" >
        &#9734; {{ Math.round(data.stargazers_count/100)/10 }}k
      </p>
      <p class="stars" v-else>&#9734; {{ data.stargazers_count }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: ['data'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 30%;
  margin: 5px;
  border: none;
  border-radius: 5px;
  height: 175px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
}
.footer {
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
}

/* Language Coloring */
.language {
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
.coffescript {
  color: red;
}
.ruby {
  color: purple;
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
</style>
