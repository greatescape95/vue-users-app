<template>
  <div>
    <h1>Add User</h1>
    
    <user-form :user="user" :is-editing="false" @save="createUser" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UserForm from './UserForm.vue';
import UserService from '../services/UserService';
import type { IUser } from '../models';

const user = ref<Partial<IUser>>({
  username: '',
  profile: {
    firstName: '',
    lastName: ''
  }
});

const router = useRouter();

const createUser = (userFormData: Partial<IUser>) => {
  const body: Partial<IUser> = {
    ...userFormData,
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
