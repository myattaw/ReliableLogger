<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
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
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <button @click="$emit('switchToRegister')" class="btn btn-link mt-3">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const email = ref('');
    const password = ref('');

    const login = () => {
      // Perform login logic here
      console.log(`Email: ${email.value}, Password: ${password.value}`);
    };

    return {
      email,
      password,
      login
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
