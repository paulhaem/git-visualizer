import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Results from '@/components/Results';
import Information from '@/components/Information';
import Commits from '@/components/Commits';
import Contributors from '@/components/Contributors';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'GitVisualizer' },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { title: 'GitVisualizer - Dashboard' },
    },
    {
      path: '/repo/:username/:reponame/information',
      name: 'Information',
      component: Information,
      meta: { title: 'GitVisualizer - Information' },
    },
    {
      path: '/repo/:username/:reponame/commits',
      name: 'Commits',
      component: Commits,
      meta: { title: 'GitVisualizer - Commits' },
    },
    {
      path: '/repo/:username/:reponame/contributors',
      name: 'Contributors',
      component: Contributors,
      meta: { title: 'GitVisualizer - Contributors' },
    },
    {
      path: '/results/:data',
      name: 'Results',
      component: Results,
      meta: { title: 'GitVisualizer - Search Results' },
    },
  ],
});
