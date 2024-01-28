<template>
  <div>
    <nav>
      <router-link :to="{ name: 'users' }">
        <el-icon><ArrowLeft /></el-icon>
      </router-link>
    </nav>

    <h1>Edit User</h1>

    <div v-loading="loading">
      <user-form v-if="user.id" :user="user" :is-editing="true" @save="updateUser" />
    </div>
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
const loading = ref(true)
const router = useRouter();

onMounted(() => {
  const userId = <string>useRoute().params.id;
  getUser(userId);
});

const getUser = (id: string) => {
  loading.value = true;
  UserService.get(id)
    .then(response => {
      user.value = response.data;
      loading.value = false;
    })
    .catch(error => {
      console.error(error);
      loading.value = false;
    });
};

const updateUser = (userFormData: Partial<IUser>) => {
  loading.value = true;
  UserService.update(user.value.id, userFormData)
    .then(() => {
      loading.value = false;
      router.push('/users');
    })
    .catch(error => {
      loading.value = false;
      console.error(error);
    });
};
</script>

<style scoped></style>
