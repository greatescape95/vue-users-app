<template>
  <div>
    <h1>Edit User</h1>

    <form @submit.prevent="updateUser">
      <label>Username:</label>
      <input v-model="user.username" required />
      <br />

      <label>First Name:</label>
      <input v-model="user.profile.firstName" required />
      <br />

      <label>Last Name:</label>
      <input v-model="user.profile.lastName" required />
      <br />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UserService from '../services/UserService';
import type { IUser } from '../models';

const user = ref<IUser>({
  id: '',
  username: '',
  createdAt: '',
  profile: {
    firstName: '',
    lastName: ''
  }
});

const router = useRouter();

onMounted(() => {
  const userId = <string>useRoute().params.id;
    getUser(userId);
});

const getUser = (id: string) => {
  UserService.get(id)
    .then(response => {
      user.value = response.data;
    })
    .catch(error => {
      console.error(error);
    });
};

const updateUser = () => {
  const body = user.value
    UserService.update(user.value.id, body)
      .then(() => {
        router.push('/users');
      })
      .catch(error => {
        console.error(error);
      });
};
</script>

<style scoped>
</style>
