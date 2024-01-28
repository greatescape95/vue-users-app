<template>
  <div>
    <h1>Edit User</h1>

    <nav>
      <router-link :to="{ name: 'users' }">
        <el-icon><ArrowLeft /></el-icon>
      </router-link>
    </nav>

    <user-form v-if="user.id" :user="user" :is-editing="true" @save="updateUser" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue'
import UserForm from './UserForm.vue';
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

const updateUser = (userFormData: Partial<IUser>) => {
  UserService.update(user.value.id, userFormData)
    .then(() => {
      router.push('/users');
    })
    .catch(error => {
      console.error(error);
    });
};
</script>

<style scoped></style>
