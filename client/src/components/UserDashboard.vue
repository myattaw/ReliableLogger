<template>
  <div class="container mt-4" v-if="user">
    <div class="card mb-3">
      <div class="card-header">
        <div class="row">
          <div class="col-md-10 text-start">
            <h3 class="header-text">Dashboard</h3>
          </div>
          <div class="col-md-2 float-end">
            <button @click="logout" class="btn btn-outline-danger col-12">Logout</button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="alert alert-dismissible alert-success">
          You are currently tracking a total of <strong>{{ plugins.length }}</strong> plugins.
        </div>
        <div class="row">
          <div class="col-md-12 text-start">
            <h2>Welcome, {{ user.username }}</h2>
            <p>Email: {{ user.email }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <input type="file" class="form-control" @change="onFileChange"/>
          </div>
          <div class="col-md-3">
            <button class="btn btn-outline-success col-12" @click="registerPlugin">Register Plugin</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="plugins.length">
      <div v-for="plugin in plugins" :key="plugin._id" class="card mb-3">
        <div class="card-header">
          <h3 class="header-text">{{ plugin.name }}</h3>
        </div>
        <div class="card-body">
          <div v-if="pluginErrors[plugin.plugin]">
            <div v-for="error in pluginErrors[plugin.plugin]" :key="error._id" class="error-message">
              <div class="text-start font-monospace" v-if="!error.collapsed">{{ error.message }}</div>
              <button class="btn btn-link btn-sm font-monospace" @click="error.collapsed = !error.collapsed">
                {{ error.collapsed ? 'Show Error from ' + formatDate(error.date) : 'Minimize Error' }}
              </button>

            </div>
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
import {defineComponent, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {getFileChecksum} from "@/utils/checksums";

interface User {
  username: string;
  email: string;
}

interface Plugin {
  _id: string;
  email: string;
  name: string;
  plugin: string;
}

interface PluginError {
  _id: string;
  plugin: string;
  message: string;
  date: string;
  collapsed: boolean;
}

export default defineComponent({
  name: 'UserDashboard',
  setup() {
    const user = ref<User | null>(null);
    const router = useRouter();
    const file = ref<File | null>(null);
    const checksum = ref<string>('');
    const plugins = ref<Plugin[]>([]);
    const pluginErrors = ref<{ [key: string]: PluginError[] }>({});

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
       // Adjust locale as needed
      return date.toLocaleString();
    };

    const onFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        file.value = input.files[0];
      }
    };

    const registerPlugin = async () => {
      try {
        if (!file.value) {
          throw new Error('No file selected.');
        }

        // TODO: Validate file type (e.g., .jar)

        checksum.value = await getFileChecksum(file.value);
        console.log('Calculated checksum:', checksum.value);

        const response = await fetch('http://localhost:5000/api/report/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            email: user.value?.email,
            name: file.value?.name,
            plugin: checksum.value
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to register plugin.');
        }

        const responseData = await response.json();
        console.log('Report successful:', responseData);
        await fetchPluginsAndErrors();

      } catch (error) {
        console.error('Error uploading file', error);
      }
    };

    const fetchPluginsAndErrors = async () => {
      try {
        await fetchPlugins();
        await fetchErrors();
      } catch (error) {
        console.error('Error fetching plugins and errors', error);
      }
    };

    const fetchPlugins = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/report/plugins?email=${encodeURIComponent(user.value?.email || '')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch plugins. Status: ${response.status}`);
        }

        const data = await response.json();
        plugins.value = data.plugins;
        console.log('Fetched plugins:', plugins.value);
      } catch (error) {
        console.error('Error fetching plugins:', error);
      }
    };

    const fetchErrors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/report/errors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch errors. Status: ${response.status}`);
        }

        const errorsData = await response.json();
        pluginErrors.value = errorsData.errors.reduce((acc: { [key: string]: PluginError[] }, error: PluginError) => {
          if (!acc[error.plugin]) {
            acc[error.plugin] = [];
          }
          error.collapsed = true; // Initialize collapsed state
          acc[error.plugin].push(error);
          return acc;
        }, {});
        console.log('Fetched errors:', pluginErrors.value);
      } catch (error) {
        console.error('Error fetching errors:', error);
      }
    };

    onMounted(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser) as { token: string; user: User };
          user.value = userData.user;
          fetchPluginsAndErrors();
        } catch (e) {
          router.push({name: 'auth'});
        }
      } else {
        router.push({name: 'auth'});
      }
    });

    const logout = () => {
      localStorage.removeItem('user');
      router.push({name: 'auth'});
    };

    return {
      user,
      logout,
      file,
      checksum,
      onFileChange,
      registerPlugin,
      plugins,
      pluginErrors,
      formatDate
    };
  }
});
</script>

<style scoped>
.header-text {
  font-size: 2em;
  color: #444444;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  text-shadow: -1px -1px 0 #aaaaaa,
  1px -1px 0 #aaaaaa,
  -1px 1px 0 #aaaaaa,
  1px 1px 0 #aaaaaa;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.error-message {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error-message p {
  margin: 0;
}

.error-message button {
  margin-top: 5px;
}
</style>
