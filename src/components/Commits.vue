<template>
  <div class="commits" v-if="commits">
    <div class="card">
      <div class="cardheader">
        <h1>Commits</h1>
      </div>
      <div class="content">
        <div id="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>

import c3 from 'c3';

export default {
  name: 'Commits',
  computed: {
    commits() {
      return this.$store.getters.commits;
    }
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
  mounted() {
    c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['Categories', 50, 100, 150, 200, 150, 100, 50]
        ],
        type: 'bar',
      },
      axis: {
        x: {
          type: 'category',
          categories: ['chore', 'docs', 'feat', 'fix', 'refactor', 'style', 'test'],
        }
      },
      bar: {
        width: {
          ratio: 0.5,
        }
      }
    });
  },
  beforeDestroy() {
    this.$store.commit('delCommits');
  },
  methods: {
    getRepository(repodata) {
      this.$store.dispatch('getRepository', repodata);
    },
    getCommits(repodata) {
      this.$store.dispatch('getCommits', repodata);
    },
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
