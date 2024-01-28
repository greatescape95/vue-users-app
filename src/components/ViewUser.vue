<template>
  <div>
    <nav>
      <router-link :to="{ name: 'users' }">
        <el-icon><ArrowLeft /></el-icon>
      </router-link>
    </nav>

    <h1>User Details</h1>

    <div v-loading="loading">
      <el-card v-if="user?.id" class="box-card">
        <div class="card-header">
          <img :src="user.profile.avatar">
          <br>
          <label>Username</label>
          <div>{{user.username}}</div>
          <label>First Name</label>
          <div>{{user.profile.firstName}}</div>
          <label>Last Name</label>
          <div>{{user.profile.lastName}}</div>
          <label>Created At</label>
          <div>{{user.createdAt}}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue'
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
</script>

<style scoped></style>
