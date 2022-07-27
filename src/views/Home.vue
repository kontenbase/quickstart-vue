<script setup>
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
</script>
<template>
  <div class="auth-page">
    <div class="auth-button">
      <button @click="switchAuthForm = 'login'">Login</button>
      <button @click="switchAuthForm = 'register'">Register</button>
      <div v-if="switchAuthForm === 'login'">
        <Login />
      </div>
      <div v-else>
        <Register />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      switchAuthForm: 'login',
    };
  },
};
</script>
