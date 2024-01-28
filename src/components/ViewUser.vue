<template>
  <div>
    <nav>
      <router-link :to="{ name: 'users' }">
        <el-icon class="cy-button-back">
          <ArrowLeft />
        </el-icon>
      </router-link>
    </nav>

    <h1>User Details</h1>

    <div v-loading="loading">
      <el-card v-if="user?.id" class="box-card">
        <img :src="user.profile.avatar">
        <label>Username</label>
        <div>{{ user.username }}</div>
        <br>
        <label>First Name</label>
        <div>{{ user.profile.firstName }}</div>
        <br>
        <label>Last Name</label>
        <div>{{ user.profile.lastName }}</div>
        <el-divider />
        <label>Created At</label>
        <div>{{ user.createdAt }}</div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import UserService from '../services/UserService';
import UtilityService from '../services/UtilityService';
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
const loading = ref(true);

onMounted(() => {
  const userId = <string>useRoute().params.id;
  getUser(userId);
});

const getUser = (id: string) => {
  loading.value = true;
  UserService.get(id)
    .then(response => {
      user.value = {
        ...response.data,
        createdAt: UtilityService.parseDate(<string>response.data.createdAt)
      };
      loading.value = false;
    })
    .catch(error => {
      console.error(error);
      loading.value = false;
    });
};
</script>

<style scoped>

.box-card {
  position: relative;
}

img {
  position: absolute;
  right: 20px;
  top: 20px;
  border-radius: 50%;
  width: 120px;
  height: auto;
}

@media (max-width: 600px) {
  img {
    width: 50px;
  }
}

label {
  background-color: darkgrey;
  padding: 5px;
  border-radius: 5px;
  font-size: 10px;
  text-transform: uppercase;
  color: white;
}
</style>
