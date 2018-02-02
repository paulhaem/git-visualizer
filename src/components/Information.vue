<template>
  <div class="information">
    <div class="card description">
      <div class="cardheader">
        <h1>{{ repository.full_name }}</h1>
        <a class="repolink" :href="repository.html_url" target="_blank">Open Repository</a>
      </div>
      <div class="content">
        <h3 v-if="repository.description">Description</h3>
        <p v-if="repository.description">{{ repository.description }}</p>
        <ul>
          <li><font-awesome-icon class="arrow" size="2x" :icon="['far', 'users']"/><span> {{ animatedContributors }}</span></li>
          <li><font-awesome-icon class="arrow plus" size="2x" :icon="['far', 'plus-circle']"/><span> {{ animatedAdditions }}</span></li>
          <li><font-awesome-icon class="arrow minus" size="2x" :icon="['far', 'minus-circle']"/><span> {{ animatedDeletions }}</span></li>
          <li><font-awesome-icon class="arrow" size="2x" :icon="['far', 'code']"/><span> {{ animatedCommits }}</span></li>
          <li><font-awesome-icon class="arrow" size="2x" :icon="['far', 'align-left']"/><span> {{ animatedLoc }}</span></li>
        </ul>
      </div>
    </div>
    <div class="card hidden" id="readme" v-if="readme">
      <div class="cardheader">
        <h1> readme.md </h1>
        <button id="showmore" class="repolink" v-on:click="toggle">Show More</button>
      </div>
      <vue-markdown>
        {{ readme }}
      </vue-markdown>
      <div v-on:click="toggle" id="expand">
        <font-awesome-icon id="arrow" size="3x" :icon="['far', 'angle-down']"  />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint max-len: "off" */
import VueMarkdown from 'vue-markdown';

export default {
  name: 'Information',
  components: {
    VueMarkdown,
  },
  data() {
    return {
      animatedContributors: 0,
      animatedAdditions: 0,
      animatedDeletions: 0,
      animatedCommits: 0,
      animatedLoc: 0,
    }
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
    },
  },
  beforeMount() {
    const repodata = {
      owner: this.$route.params.username,
      repo: this.$route.params.reponame,
      token: this.$store.getters.token,
    };
    this.getReadMe(repodata);
    this.getRepository(repodata);
    this.getStatistics(repodata);

    this.$store.commit('setDisplayNavigation', true);
    this.number = 100000;
  },
  beforeDestroy() {
    this.$store.commit('delReadme');
    this.$store.commit('delStatistics');
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
    toggle() {
      const elshowmore = document.getElementById('showmore');
      elshowmore.classList.toggle('showless');
      if(elshowmore.classList.contains('showless')){
        elshowmore.innerHTML = 'Show Less';
      } else {
        elshowmore.innerHTML = 'Show More';
      }

      const elreadme = document.getElementById('readme');
      elreadme.classList.toggle('hidden');

      const elarrow = document.getElementById('arrow');
      elarrow.classList.toggle('up');
    },
    animateNumber(newValue, oldValue, target) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
          switch(target){
            case 'contributors':
              vm.animatedContributors = this.tweeningNumber.toFixed(0); break;
            case 'additions':
              vm.animatedAdditions = this.tweeningNumber.toFixed(0); break;
            case 'deletions':
              vm.animatedDeletions = this.tweeningNumber.toFixed(0); break;
            case 'commits':
              vm.animatedCommits = this.tweeningNumber.toFixed(0); break;
            case 'loc':
              vm.animatedLoc = this.tweeningNumber.toFixed(0); break;
          }

        })
        .start()

      animate()
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route.params.reponame'(newReponame, oldReponame) {
      const repodata = {
        owner: this.$route.params.username,
        repo: this.$route.params.reponame,
      };
      this.$store.commit('delReadme');
      this.$store.commit('delStatistics');
      this.getReadMe(repodata);
      this.getRepository(repodata);
      this.getStatistics(repodata);
    },
    '$store.getters.statistics.contributors': function(newValue, oldValue) {
      this.animateNumber(newValue, oldValue, 'contributors');
    },
    '$store.getters.statistics.additions': function(newValue, oldValue) {
      this.animateNumber(newValue, oldValue, 'additions');
    },
    '$store.getters.statistics.deletions': function(newValue, oldValue) {
      this.animateNumber(newValue, oldValue, 'deletions');
    },
    '$store.getters.statistics.commits': function(newValue, oldValue) {
      this.animateNumber(newValue, oldValue, 'commits');
    },
    '$store.getters.statistics.loc': function(newValue, oldValue) {
      this.animateNumber(newValue, oldValue, 'loc');
    },
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
}
.content h3 {
  color: #888888;
}
.content ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  color: #888888;
}
.content ul li {
  font-weight: bold;
}
.content span {
  padding-left: .2em;
  font-size: 1.4em;
}
.plus {
  color: #87AA66;
}
.minus {
  color: #E16989;
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

.cardheader h1 {
  margin-top: 0;
  color: #ffffff;
  text-align: left;
  padding-left: .5em;
  line-height: 1.5;
}
#showmore {
  cursor: pointer;
  width: 8em;
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
