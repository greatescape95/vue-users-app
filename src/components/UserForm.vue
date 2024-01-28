<template>
  <el-form ref="userFormRef" :model="userForm" :rules="rules" :size="formSize">
    <el-form-item label="Username" prop="username">
      <el-input v-model="userForm.username" name="username" />
    </el-form-item>

    <el-form-item label="First Name" prop="firstName">
      <el-input v-model="userForm.firstName" name="firstName" />
    </el-form-item>

    <el-form-item label="Last Name" prop="lastName">
      <el-input v-model="userForm.lastName" name="lastName" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" class="cy-submit-user" @click="submitForm(userFormRef)" :disabled="!isValid()">
        {{ isEditing ? 'Update' : 'Add' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import type { IUser } from '../models';

interface UserForm {
  username: string;
  firstName: string;
  lastName: string;
}

const { user, isEditing } = defineProps<{ user: IUser, isEditing: boolean; }>();
const emit = defineEmits(['save']);

const formSize = ref('default');
const userFormRef = ref();
const userForm = reactive<UserForm>({
  username: user.username,
  firstName: user.profile.firstName,
  lastName: user.profile.lastName
});

const rules = reactive<FormRules<UserForm>>({
  username: [
    { required: true, message: 'Please input Username.', trigger: 'blur' },
  ],
  firstName: [
    { required: true, message: 'Please input First Name.', trigger: 'blur' },
  ],
  lastName: [
    { required: true, message: 'Please input Last Name', trigger: 'blur' },
  ]
});

const isValid = () => {
  return userForm.username && userForm.firstName && userForm.lastName;
};

const submitForm = async (formEl: FormInstance) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('save', {
        ...user,
        username: userForm.username,
        profile: {
          ...user.profile,
          firstName: userForm.firstName,
          lastName: userForm.lastName,
        }
      });
    } else {
      console.log('error submiting', fields);
    }
  });
};
</script>

<style scoped></style>
