<template>
  <div>
    <h1>User List</h1>
    <button>
      <router-link :to="{ name: 'new' }">new user</router-link>
    </button>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.username }}
        <button>
          <router-link :to="{ name: 'edit', params: { id: user.id } }">edit</router-link>
        </button>
        <button @click="deleteUser(user.id)">
          delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UserService from '../services/UserService';
import type { IUser } from '../models';

const users = ref<IUser[]>([]);

onMounted(() => {
  getUsers();
});

const getUsers = () => {
  UserService.getAll()
    .then(response => {
      users.value = response.data;
    })
    .catch(error => {
      console.error(error);
    });
};

const deleteUser = (id: string) => {
  // todo add confirm
  UserService.delete(id)
    .then(() => {
      getUsers();
    })
    .catch(error => {
      console.error(error);
    });
};
</script>

<style scoped>
</style>
