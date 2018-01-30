<template>
  <div class="information">
    <div class="card description">
      <h1>{{ repository.full_name }}</h1>
      <div class="content">
        <h3>Description</h3>
        <p>{{ repository.description }}</p>
        <a class="repolink" :href="repository.html_url" target="_blank">Open Repository</a>
      </div>
    </div>
    <div class="card hidden" id="readme">
      <h1> {{ readme.name }} </h1>
      <vue-markdown>
        {{ decode(readme.content) }}
      </vue-markdown>
      <div v-on:click="toggle" id="expand">
        <font-awesome-icon id="arrow" size="3x" :icon="['far', 'angle-down']"  />
      </div>
    </div>
  </div>
</template>

<script>
import base64 from 'base-64';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'Information',
  components: {
    VueMarkdown,
  },
  computed: {
    readme() {
      return this.$store.getters.readme;
    },
    repository() {
      return this.$store.getters.repository;
    },
  },
  mounted() {
    const repodata = {
      owner: this.$route.params.username,
      repo: this.$route.params.reponame,
    };

    this.getRepository(repodata);
    this.getReadMe(repodata);
  },
  methods: {
    getRepository(repodata) {
      this.$store.dispatch('getRepository', repodata);
    },
    getReadMe(repodata) {
      this.$store.dispatch('getReadMe', repodata);
    },
    decode(content) {
      return base64.decode(content);
    },
    toggle() {
      const elreadme = document.getElementById("readme");
      elreadme.classList.toggle("hidden");

      const elarrow = document.getElementById("arrow");
      elarrow.classList.toggle("up");
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 100%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  margin: 15px;
}
.description h1 {
  background-color: #845C9C;
  border-radius: 5px 5px 0 0;
  color: white;
  line-height: 1.5;
}
.content {
  position: relative;
  padding: 0 1em .5em 1em;
  font-size: .75em;
}
.description h3 {
  text-align: left;
}
.description p {
  text-align: left;
}
.repolink {
  position: absolute;
  right: 2em;
  top: -.2em;
  border: 3px #845c9c solid;
  padding: .5em 1em;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
}
.repolink:hover {
  background-color: #845c9c;
  color: white;
}

#readme {
  overflow: hidden;
  position: relative;
  padding-bottom: 50px;
}

.up {
  transform: rotate(180deg);
}
.hidden {
  height: 300px;
}
#expand {
  cursor: pointer;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #845c9c;
  color: white;
}
.information {
  width: calc(100vw - 300px - 20vw);
}
</style>
