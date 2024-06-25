<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-if="showLogin">
      <LoginForm @switchToRegister="toggleForm"/>
    </div>
    <div v-else>
      <RegisterForm @switchToLogin="toggleForm"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';

export default defineComponent({
  name: 'App',
  components: {
    LoginForm,
    RegisterForm
  },
  setup() {
    const showLogin = ref(true);

    const toggleForm = () => {
      showLogin.value = !showLogin.value;
    };

    return {
      showLogin,
      toggleForm
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
