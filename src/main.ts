import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import UserList from './components/UserList.vue';
import EditUser from './components/EditUser.vue';
import NewUser from './components/NewUser.vue';

const routes = [
  {
    path: '/users',
    name: 'users',
    component: UserList
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditUser
  },
  {
    path: '/new',
    name: 'new',
    component: NewUser
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/users'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
