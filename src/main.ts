import './assets/main.css';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import UserList from './components/UserList.vue';
import EditUser from './components/EditUser.vue';
import ViewUser from './components/ViewUser.vue';
import NewUser from './components/NewUser.vue';

const routes = [
  {
    path: '/users',
    name: 'users',
    component: UserList
  },
  {
    path: '/users/edit/:id',
    name: 'edit',
    component: EditUser
  },
  {
    path: '/users/view/:id',
    name: 'edit',
    component: ViewUser
  },
  {
    path: '/users/new',
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
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app');
