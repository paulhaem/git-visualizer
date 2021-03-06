<template>
  <div v-if="isAuthenticated">
    <div class="card container">
      <a v-bind:href="user.html_url" target="_blank">
        <img v-bind:src="user.avatar_url" alt="Avatar" class="avatar">
      </a>
      <p class="usermessage">Logged in as <a v-bind:href="user.html_url" target="_blank" class="username">{{ user.login }}</a>.</p>
    </div>
    <UserRepos class="card userrepos" />
    <button @click="logout" class="card button logout">Logout</button>
  </div>
  <div v-else>
    <button @click="authenticate" class="card button login"><font-awesome-icon class="arrow" size="2x" :icon="['fab', 'github']" /> <span>Login with Github</span></button>
  </div>
</template>

<script>

import * as firebase from 'firebase';

import Vue from 'vue'
import axios from 'axios';
import UserRepos from './UserRepos';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyC4qVRo-ER91l_ZtF3h4z-Ru6uUoVejUdE",
  authDomain: "git-visualizer.firebaseapp.com",
  databaseURL: "https://git-visualizer.firebaseio.com",
  projectId: "git-visualizer",
  storageBucket: "",
  messagingSenderId: "355349439807"
};
firebase.initializeApp(config);

const provider = new firebase.auth.GithubAuthProvider();
provider.addScope('repo');
provider.setCustomParameters({
  'allow_signup': 'false'
});

export default {
  name: 'Login',
  data () {
    return {
      access_token: null,
      response: null
    }
  },
  components: {
    UserRepos
  },
  beforeMount() {
    this.checkSession();
    if(this.$store.getters.token) {
      this.getUserRepos(this.$store.getters.token);
    }
  },
  methods: {
    getUserRepos(token) {
      this.$store.dispatch('getUserRepos', token);
    },
    authenticate() {
      firebase.auth().signInWithPopup(provider).then((result) => {
        const token = result.credential.accessToken;

        this.$store.commit('setToken', token);
        this.$store.dispatch('getUser', token);

        this.$session.start();
        this.$session.set('token', token);

        this.$store.commit('setAuthentication', true);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
    },
    logout() {
        this.$session.destroy();
        this.$store.commit('setAuthentication', false);
    },
    checkSession() {
      if(!this.$session.exists() && !this.$session.has('token'))
      {
        this.$store.commit('setAuthentication', false);
      }
      else
      {
        if(!this.$store.state.isAuthenticated)
        {
          const token = this.$session.get('token');
          this.$store.commit('setToken', token);

          this.$store.dispatch('getUser', token);
          this.$store.dispatch('getUserRepos', token);

          this.$store.commit('setAuthentication', true);
        }
      }
    }
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    user() {
      return this.$store.getters.user;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
};

</script>

<style scoped>

.button {
  width: 100%;

  background-color: #FFFFFF;
  border: none;


  padding: 15px 10%;

  font-size: 20px;
  font-weight: bold;
  color: #845C9C;

  cursor: pointer;
  transition: .20s;
}

.card {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  margin-bottom: 15px;
  border-radius: 5px;
}

.userrepos {
  background-color: #ffffff;
}

.button:hover {
  background-color: #845C9C;
  color: #FFFFFF;
}

.login {
  text-align: left;

  padding: 15px 5%;

  display: flex;
  align-items: center;
}

.login > span {
  padding: 0 15px;
}

.logout {
  border-style: solid;
  border-color: #E16989;
  border-width: 3px;

  color: #E16989;
}

.logout:hover {
  background-color: #E16989;

  color: #FFFFFF;
}

.container {
  background-color: #FFFFFF;
  border: none;

  padding: 15px 10%;
}

.avatar {
  width: 60%;

  border-style: solid;
  border-color: #845C9C;
  border-width: 4px;
  border-radius: 100%;
}

.usermessage {
  font-weight: bold;
  font-size: 20px;

  color: #888888;
}

.username {
  color: #845C9C;
  text-decoration: none;
}
.username:hover {
  text-decoration: underline;
}

</style>
