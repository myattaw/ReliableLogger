<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Register</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="username"
                    required
                >
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    required
                >
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    required
                >
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    required
                >
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
            <button @click="$emit('switchToLogin')" class="btn btn-link mt-3">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'RegisterForm',
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const register = () => {
      // Perform register logic here
      console.log(`username: ${username.value}, Email: ${email.value}, Password: ${password.value}, Confirm Password: ${confirmPassword.value}`);
    };

    return {
      username,
      email,
      password,
      confirmPassword,
      register
    };
  }
});
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.card {
  padding: 20px;
}
</style>
