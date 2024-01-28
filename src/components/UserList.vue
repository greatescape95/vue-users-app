<template>
  <h1>Users</h1>

  <nav>
    <router-link :to="{ name: 'new' }">
      <el-icon class="cy-new-button">
        <Plus />
      </el-icon>
    </router-link>
    <search @search="handleSearch" :searchProperty="'username'" />
  </nav>

  <br>

  <div v-loading="loading">

    <el-table :data="paginatedUsers">
      <el-table-column label="Avatar" width="80">
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
          <el-button link type="primary" size="small" @click="editUser(scope.row.id)">Edit</el-button>
          <el-button link type="primary" size="small" @click="viewUser(scope.row.id)">View Details</el-button>
          <el-button link type="primary" size="small" @click="deleteUser(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next" :total="filteredUsers.length" :current-page.sync="currentPage" :page-size="itemsPerPage" @current-change="onPageChange">
    </el-pagination>
  </div>

  <el-dialog v-model="dialogVisible" title="Confirm delete" width="30%">
    <div>Are you sure you want to delete this user?</div>
    <br><br>
    <div>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="onConfirmDelete()">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import Search from './shared/Search.vue';
import UserService from '../services/UserService';
import UtilityService from '../services/UtilityService';
import type { IUser } from '../models';

const users = ref<IUser[]>([]);
const filteredUsers = ref<IUser[]>([]);
const paginatedUsers = ref<IUser[]>([]);
const searchTerm = ref('');
const loading = ref(true);

const itemsPerPage = ref(10);
const currentPage = ref(1);

const router = useRouter();

const dialogVisible = ref(false);
let itemToDelete: string | null = null;

onMounted(() => {
  getUsers();
});

const getUsers = () => {
  loading.value = true;
  UserService.getAll()
    .then(response => {
      users.value = response.data.map(user => {
        return {
          ...user,
          createdAt: UtilityService.parseDate(<string>user.createdAt)
        };
      });
      loading.value = false;
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

const viewUser = (id: string) => {
  return router.push(`/users/view/${id}`);
};

const deleteUser = (id: string) => {
  dialogVisible.value = true;
  itemToDelete = id;
};

const onConfirmDelete = () => {
  loading.value = true;
  UserService.delete(<string>itemToDelete)
    .then(() => {
      dialogVisible.value = false;
      itemToDelete = null;
      loading.value = false;
      ElMessage('User is sucessfully deleted.');
      getUsers();
    })
    .catch(error => {
      loading.value = true;
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
