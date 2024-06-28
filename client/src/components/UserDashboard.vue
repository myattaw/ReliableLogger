<template>
  <div class="container mt-4" v-if="user">
    <div class="card">
      <div class="card-header ">
        <h3 class="header-text">Dashboard</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h4>Welcome, {{ user.username }}</h4>
            <p>Email: {{ user.email }}</p>
          </div>
          <div class="col-md-6">
            <button @click="logout" class="btn btn-danger float-end">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface User {
  username: string;
  email: string;
}

export default defineComponent({
  name: 'UserDashboard',
  setup() {
    const user = ref<User | null>(null);
    const router = useRouter();

    onMounted(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser) as { token: string; user: User };
          user.value = userData.user;
        } catch (e) {
          router.push({ name: 'auth' });
        }
      } else {
        router.push({ name: 'auth' });
      }
    });

    const logout = () => {
      localStorage.removeItem('user');
      router.push({ name: 'auth' });
    };

    return {
      user,
      logout
    };
  }
});
</script>

<style scoped>
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
