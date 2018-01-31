import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Results from '@/components/Results';
import Information from '@/components/Information';

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
      path: '/results/:data',
      name: 'Results',
      component: Results,
    },
  ],
});
