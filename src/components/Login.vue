<template>
  <div v-if="isAuthenticated">
    <div class="container">
      <img v-bind:src="user.avatar_url" alt="Avatar" class="avatar">
      <p class="usermessage">Logged in as <span class="username">{{ user.login }}</span>.</p>
    </div>
    <button @click="logout" class="button logout">Logout</button>
  </div>
  <div v-else>
    <button @click="authenticate" class="button">Login with Github</button>
  </div>
</template>

<script>

import * as firebase from 'firebase';

import Vue from 'vue'
import axios from 'axios';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBBUm9k3N-EzrjNNBl7ntDZ_GoBjJ34rQw',
  authDomain: 'git-visualizer-backend.firebaseapp.com',
  databaseURL: 'https://git-visualizer-backend.firebaseio.com',
  projectId: 'git-visualizer-backend',
  storageBucket: 'git-visualizer-backend.appspot.com',
  messagingSenderId: '55090565755',
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
  mounted() {
    this.checkSession();
  },
  methods: {
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
          const token = this.$session.get('token')
          this.$store.dispatch('getUser', token);

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
  border-radius: 5px;

  padding: 15px 10%;

  box-shadow: 0 3px 6px rgba(0,0,0,0.16);

  font-size: 20px;
  font-weight: bold;
  color: #845C9C;

  cursor: pointer;
  transition: .20s;
}

.button:hover {
  background-color: #845C9C;
  color: #FFFFFF;
}

.logout {
  border-style: solid;
  border-color: #E16989;
  border-width: 3px;

  color: #E16989;

  margin-top: 15px;
}

.logout:hover {
  background-color: #E16989;

  color: #FFFFFF;
}

.container {
  background-color: #FFFFFF;
  border: none;
  border-radius: 5px;

  padding: 15px 10%;

  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
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
}

</style>