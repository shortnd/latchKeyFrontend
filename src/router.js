import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AddKid from './views/AddKid.vue';
import KidInfo from './views/KidInfo.vue';
import UpdateKid from './views/UpdateKid.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/add-kid',
      name: 'AddKid',
      component: AddKid,
    },
    {
      path: '/kids/:id',
      name: 'KidInfo',
      component: KidInfo,
    },
    {
      path: '/kids/update/:id',
      name: 'UpdateKid',
      component: UpdateKid,
    },
  ],
});
