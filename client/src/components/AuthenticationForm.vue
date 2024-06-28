<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <div class="header-text">{{ isLoginMode ? 'Login' : 'Register' }}</div>
          </div>
          <div class="card-body">
            <!-- Display error message -->
            <div v-if="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>
            <form @submit.prevent="isLoginMode ? login() : register()">
              <div v-if="!isLoginMode" class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="name"
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
              <div class="row">
                <div class="col-12 mb-2">
                  <button type="submit" class="btn btn-primary w-100">{{ isLoginMode ? 'Login' : 'Create Account' }}</button>
                </div>
                <div class="col-12">
                  <button @click="toggleMode" type="button" class="btn btn-outline-info w-100">
                    {{ isLoginMode ? 'Switch to Register' : 'Switch to Login' }}
                  </button>
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
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CombinedAuthForm',
  setup() {
    const isLoginMode = ref(true);
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();

    const toggleMode = () => {
      isLoginMode.value = !isLoginMode.value;
      error.value = ''; // Clear error on mode switch
    };

    const login = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          error.value = errorData.msg || error.value; // Set error message
          throw new Error(error.value); // Throw error to catch block
        }

        const responseData = await response.json();
        console.log('Login successful:', responseData);

        localStorage.setItem('user', JSON.stringify(responseData));
        await router.push({name: 'dashboard'});

      } catch (error: any) {
        console.error('Login error:', error.message);
        // Optionally handle error logging or reporting
      }
    };

    const register = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          error.value = errorData.msg || 'Failed to register'; // Set error message
          throw new Error(error.value); // Throw error to catch block
        }

        const responseData = await response.json();
        console.log('Registration successful:', responseData);

        localStorage.setItem('user', JSON.stringify(responseData));
        await router.push({name: 'dashboard'});

      } catch (error: any) {
        console.error('Registration error:', error.message);
        // Optionally handle error logging or reporting
      }
    };

    return {
      isLoginMode,
      name,
      email,
      password,
      toggleMode,
      login,
      register,
      error, // Expose error state to template
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
  font-size: 2em;
  color: #444444;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  text-shadow:
      -1px -1px 0 #aaaaaa,
      1px -1px 0 #aaaaaa,
      -1px 1px 0 #aaaaaa,
      1px 1px 0 #aaaaaa;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
