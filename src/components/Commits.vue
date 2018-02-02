<template>
  <div class="commits">
    <div class="card" v-if="commits.length > 0">
      <div class="cardheader">
        <h1>Commits</h1>
      </div>
      <div class="content">
        <div id="chart"></div>
      </div>
    </div>
    <div v-if="commits.length === 0">
      LOADING
    </div>
  </div>
</template>

<script>

import c3 from 'c3';
import './../assets/c3.min.css'

export default {
  name: 'Commits',
  computed: {
    commits() {
      return this.$store.getters.commits;
    },
    commitTypes() {
      return this.$store.getters.commitTypes;
    },
  },
  beforeMount() {
    const repodata = {
      owner: this.$route.params.username,
      repo: this.$route.params.reponame,
      token: this.$store.getters.token,
    };
    this.getRepository(repodata);
    this.getCommits(repodata);
    this.$store.commit('setDisplayNavigation', true);


  },
  beforeDestroy() {
    this.$store.commit('delCommits');
  },
  updated() {
    this.createChart(this.$store.getters.commitTypes);
  },
  methods: {
    getRepository(repodata) {
      this.$store.dispatch('getRepository', repodata);
    },
    getCommits(repodata) {
      this.$store.dispatch('getCommits', repodata);
    },
    createChart(commitTypes) {
      const chores = ['chores', commitTypes.chores];
      const docs = ['docs', commitTypes.docs];
      const feat = ['feat', commitTypes.feat];
      const fix = ['fix', commitTypes.fix];
      const refactor = ['refactor', commitTypes.refactor];
      const style = ['style', commitTypes.style];
      const test = ['test', commitTypes.test];
      const notSemantic = ['undefined', commitTypes.notSemantic];

      c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          chores,
          docs,
          feat,
          fix,
          refactor,
          style,
          test,
          notSemantic
        ],
        type: 'bar',
      },
      axis: {
        x: {
          type: 'category',
          categories: [''],
        }
      },
      bar: {
        width: {
          ratio: 0.5,
        }
      },
      color: {
        pattern: ['#F1524F', '#DE8051', '#F8A147', '#77AE6D', '#74ADAB', '#47BED6', '#62CAEF', '#888888'],
      },
    })
    }
  },
  watch: {
    // eslint-disable-next-line
    '$route.params.reponame'(newReponame, oldReponame) {
      const repodata = {
        owner: this.$route.params.username,
        repo: this.$route.params.reponame,
      };
      this.$store.commit('delCommits');
      this.getCommits(repodata);
    },
  },
};

</script>

<style scoped>

.commits {
  width: calc(100vw - 300px - 20vw);
}

.card {
  width: 100%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  margin: 0 15px 15px 15px;
  background-color: #ffffff;
}

.cardheader {
  border-radius: 5px 5px 0 0;
  background-color: #845C9C;
  position: relative;
}

.commits h1 {
  color: white;
  line-height: 1.5;
  text-align: left;
  padding-left: .5em;
  margin-top: 0;
}

.content {
  padding: 0 1em .5em 1em;
}

#chart {
  width: 100%;
}

</style>
