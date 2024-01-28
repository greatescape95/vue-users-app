<template>
  <div>
    <el-input 
      class="cy-search" 
      v-model="searchTerm" 
      :placeholder="'Search by ' + searchProperty" 
      :prefix-icon="Search" 
      clearable 
      @input="searchItems" 
      @clear="clearSearch" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

const { searchProperty } = defineProps(['searchProperty']);
const emit = defineEmits(['search']);

const searchTerm = ref('');

const searchItems = () => {
  emit('search', searchTerm.value);
};

const clearSearch = () => {
  searchTerm.value = '';
  searchItems();
};
</script>

<style scoped></style>
