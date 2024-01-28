<template>
  <div>
    <nav>
      <router-link :to="{ name: 'users' }">
        <el-icon>
          <ArrowLeft />
        </el-icon>
      </router-link>
    </nav>

    <h1>Add User</h1>

    <div v-loading="loading">
      <user-form :user="user" :is-editing="false" @save="createUser" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import UserForm from './UserForm.vue';
import UserService from '../services/UserService';
import type { IUser } from '../models';

const user = ref<IUser>({
  username: '',
  profile: {
    firstName: '',
    lastName: ''
  }
});
const loading = ref(false);
const router = useRouter();

const createUser = (userFormData: IUser) => {
  loading.value = true;
  const body: Partial<IUser> = {
    ...userFormData,
    createdAt: new Date().toUTCString()
  };

  UserService.create(body)
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
