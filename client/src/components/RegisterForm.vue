<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <div class="header-text">Register</div>
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
              <div class="row">
                <div class="col-12 col-md-9 mb-2 mb-md-0">
                  <button type="submit" class="btn btn-primary w-100">Register</button>
                </div>
                <div class="col-12 col-md-3">
                  <button @click="$emit('switchToLogin')" type="button" class="btn btn-info w-100">Login</button>
                </div>
              </div>
            </form>
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

.header-text {
  font-size: 2em; /* Adjust the font size as needed */
  color: #515960; /* Make the text color transparent */
  text-transform: uppercase; /* Make text uppercase */
  letter-spacing: 0.1em; /* Adjust the letter spacing as needed */
  text-shadow:
      -1px -1px 0 #aaaaaa,
      1px -1px 0 #aaaaaa,
      -1px 1px 0 #aaaaaa,
      1px 1px 0 #aaaaaa; /* Create the outline with shadows */
  -webkit-user-select: none; /* Chrome, Safari, Opera */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version */
}

</style>
