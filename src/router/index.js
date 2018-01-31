import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Results from '@/components/Results';
import Information from '@/components/Information';
import Commits from '@/components/Commits';
import Contributors from '@/components/Contributors';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/repo/:username/:reponame/information',
      name: 'Information',
      component: Information,
    },
    {
      path: '/repo/:username/:reponame/commits',
      name: 'Commits',
      component: Commits,
    },
    {
      path: '/repo/:username/:reponame/contributors',
      name: 'Contributors',
      component: Contributors,
    },
    {
      path: '/results/:data',
      name: 'Results',
      component: Results,
    },
  ],
});
