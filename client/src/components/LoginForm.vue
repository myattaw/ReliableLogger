<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <div class="header-text">Login</div>
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
              <div class="row">
                <div class="col-12 col-md-9 mb-2 mb-md-0">
                  <button type="submit" class="btn btn-primary w-100">Login</button>
                </div>
                <div class="col-12 col-md-3">
                  <button @click="$emit('switchToRegister')" type="button" class="btn btn-info w-100">Sign Up</button>
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
