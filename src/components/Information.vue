<template>
  <div class="information">
    <div class="card description">
      <div class="cardheader">
        <h1>{{ repository.full_name }}</h1>
        <a class="repolink" :href="repository.html_url" target="_blank">Open Repository</a>
      </div>
      <div class="content">
        <h3>Description</h3>
        <p>{{ repository.description }}</p>
        <ul>
          <li><font-awesome-icon class="arrow" size="2x" :icon="['far', 'users']"/> {{ statistics.contributors }}</li>
          <li><font-awesome-icon class="arrow" size="2x" :icon="['far', 'plus-circle']"/> {{ statistics.additions }}</li>
          <li><font-awesome-icon class="arrow" size="2x" :icon="['far', 'minus-circle']"/> {{ statistics.deletions }}</li>
          <li><font-awesome-icon class="arrow" size="2x" :icon="['far', 'code']"/> {{ statistics.commits }}</li>
          <li><font-awesome-icon class="arrow" size="2x" :icon="['far', 'align-left']"/> {{ statistics.loc }}</li>
        </ul>
      </div>
    </div>
    <div class="card hidden" id="readme">
      <h1> Readme.md </h1>
      <vue-markdown v-if="readme">
        {{ readme }}
      </vue-markdown>
      <div v-on:click="toggle" id="expand">
        <font-awesome-icon id="arrow" size="3x" :icon="['far', 'angle-down']"  />
      </div>
    </div>
  </div>
</template>

<script>
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
    statistics() {
      return this.$store.getters.statistics;
    },
    numCommits() {
      return this.$store.getters.numCommits;
    }
  },
  created() {
    const repodata = {
      owner: this.$route.params.username,
      repo: this.$route.params.reponame,
    };
    if( !this.$store.getters.repository
    || (repodata.owner !== this.$store.getters.repository.owner.login
    && repodata.repo !== this.$store.getters.repository)){
      this.getReadMe(repodata);
      this.getRepository(repodata);
      this.getStatistics(repodata);
      this.getCommits(repodata);
    };
  },
  methods: {
    getRepository(repodata) {
      this.$store.dispatch('getRepository', repodata);
    },
    getReadMe(repodata) {
      this.$store.dispatch('getReadMe', repodata);
    },
    getStatistics(repodata) {
      this.$store.dispatch('getStatistics', repodata);
    },
    getCommits(repodata) {
      this.$store.dispatch('getCommits', repodata);
    },
    toggle() {
      const elreadme = document.getElementById('readme');
      elreadme.classList.toggle('hidden');

      const elarrow = document.getElementById('arrow');
      elarrow.classList.toggle('up');
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route.params.username'(newName, oldName) {

    },
    'this.$store.getters.readme'(newReadme, oldReadme) {
      $store.getters.readme = newReadme;
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
  margin: 0 15px 15px 15px;
  background-color: #ffffff;
}
.description h1 {
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
  padding: 0 1em .5em 1em;
  font-size: .75em;
}
.content ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
}
.content ul li {
  font-weight: bold;
}

.description h3 {
  text-align: left;
}
.description p {
  text-align: left;
}
.repolink {
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: 3px white solid;
  padding: .2em .7em;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  color: #845c9c;
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
