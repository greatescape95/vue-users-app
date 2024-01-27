<template>
  <div>
    <h1>User List</h1>

    <search @search="handleSearch" />

    <button>
      <router-link :to="{ name: 'new' }">new user</router-link>
    </button>

    <el-table :data="paginatedUsers">
      <el-table-column fixed label="Avatar">
        <template #default="scope">
          <img v-bind:src="scope.row.profile.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="Created At" />
      <el-table-column prop="username" label="Username" />
      <el-table-column prop="profile.firstName" label="First Name" />
      <el-table-column prop="profile.lastName" label="Last Name" />
      <el-table-column fixed="right" label="Actions">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="deleteUser(scope.row.id)">Delete</el-button>
          <el-button link type="primary" size="small" @click="editUser(scope.row.id)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="filteredUsers.length" :current-page.sync="currentPage" :page-size="itemsPerPage" @current-change="onPageChange">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import Search from './shared/Search.vue';
import UserService from '../services/UserService';
import type { IUser } from '../models';

const users = ref<IUser[]>([]);
const filteredUsers = ref<IUser[]>([]);
const paginatedUsers = ref<IUser[]>([]);
const searchTerm = ref('');

const itemsPerPage = ref(5);
const currentPage = ref(1);

const router = useRouter();

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

const handleSearch = (newSearchTerm: string) => {
  searchTerm.value = newSearchTerm;
};

watch([users, searchTerm], () => {
  filteredUsers.value = filterUsers();
  paginatedUsers.value = paginateUsers(filteredUsers.value);
});

const filterUsers = () => {
  return users.value.filter(user => user.username.toLowerCase().includes(searchTerm.value.toLowerCase()));
};

const paginateUsers = (users: IUser[]) => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return users.slice(start, end);
};

const onPageChange = (page: number) => {
  currentPage.value = page;
  paginatedUsers.value = paginateUsers(filteredUsers.value);
};

const editUser = (id: string) => {
  return router.push(`/users/edit/${id}`);
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
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
