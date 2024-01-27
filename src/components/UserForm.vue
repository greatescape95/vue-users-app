<template>
  <form @submit.prevent="handleSubmit">
    <label for="username">Username:</label>
    <input v-model="user.username" required />
    <br />

    <label for="firstName">First Name:</label>
    <input v-model="user.profile.firstName" required />
    <br />

    <label for="lastName">Last Name:</label>
    <input v-model="user.profile.lastName" required />
    <br />

    <button type="submit">{{ isEditing ? 'Update' : 'Add' }}</button>
  </form>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const { user: initialUser, isEditing: initialIsEditing } = defineProps(['user', 'isEditing']);
const emit = defineEmits(['save']);

const user = ref({ ...initialUser });
const isEditing = ref(initialIsEditing);

const handleSubmit = () => {
  emit('save', user.value);
};
</script>

<style scoped>
</style>
