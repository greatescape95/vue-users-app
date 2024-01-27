<template>
  <div>
    <h1>New User</h1>

    <form @submit.prevent="createUser">
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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

const createUser = () => {
  const body: IUser = {
    ...user.value,
    createdAt: new Date().toDateString()
  };

  UserService.create(body)
    .then(() => {
      router.push('/users');
    })
    .catch(error => {
      console.error(error);
    });
};
</script>

<style scoped></style>
