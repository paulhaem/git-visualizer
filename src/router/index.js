import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import PageNotFound from '@/components/PageNotFound';
import Results from '@/components/Results';
import Information from '@/components/Information';
import Commits from '@/components/Commits';
import Contributors from '@/components/Contributors';
import Dashboard from '@/components/Dashboard';

import { store } from './../store/store';


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
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
      meta: { title: 'GitVisualizer - 404' },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next({
            name: 'PageNotFound',
          });
        }
      },
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
