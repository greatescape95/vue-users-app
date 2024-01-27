<template>
  <div>
    <label :for="inputId">Search by {{ searchProperty }}:</label>
    <input v-model="searchTerm" @input="searchItems" :id="inputId" />

    <button @click="clearSearch">Clear</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const { searchProperty } = defineProps(['searchProperty']);
const emit = defineEmits(['search']);

const searchTerm = ref('');
const inputId = `search-${searchProperty}`;

const searchItems = () => {
  emit('search', searchTerm.value);
};

const clearSearch = () => {
  searchTerm.value = '';
  searchItems();
};
</script>

<style scoped></style>
