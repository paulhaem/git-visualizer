<template>
  <div v-if="isAuthenticated">
    <div class="container">
      <img v-bind:src="user.avatar_url" alt="Avatar" class="avatar">
      <p class="usermessage">Logged in as <span class="username">{{ user.login }}</span>.</p>
    </div>
    <button @click="logout" class="button logout">Logout</button>
  </div>
  <div v-else>
    <button @click="authenticate" class="button login"><font-awesome-icon class="arrow" size="2x" :icon="['fab', 'github']" /> <span>Login with Github</span></button>
  </div>
</template>

<script>

import * as firebase from 'firebase';

import Vue from 'vue'
import axios from 'axios';

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
