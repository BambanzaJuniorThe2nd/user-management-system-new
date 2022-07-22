<template>
  <section>
    <!-- User listing section -->
    <section class="mt-5 rounded w-10/12 mx-auto">
      <div class="flex flex-row justify-between">
        <h1 class="text-center py-2 font-bold">Users</h1>
        <button class="flex flex-row items-center bg-blue-600 hover:bg-blue-400 text-white rounded text-sm p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          New User
        </button>
      </div>

      <!-- Search bar  -->
      <form class="mt-5 group relative">
        <svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
        <input type="text" class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none rounded w-full text-sm leading-6 py-2 pl-10 ring-1 placeholder-slate-400 ring-slate-200 shadow-sm" placeholder="Filter users...">
      </form>

      <!-- Users -->
      <ul class="mt-10 grid grid-cols-4 gap-4">
        <li v-for="user in users" class="cursor-pointer group hover:bg-blue-500 hover:ring-blue-500 hover:shadow p-3 bg-white ring-1 ring-slate-200 rounded shadow-sm">
          <a href="#" class="block text-center">
            <div class="w-20 h-20 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full group-hover:stroke-gray-100" fill="none" viewBox="0 0 24 24" stroke="#C3C7CE" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="block group-hover:text-white font-semibold text-slate-900 mt-1">{{user.name}}</span>
            <hr class="mt-1">
            <span class="block group-hover:text-blue-200 text-slate-900 text-sm font-light mt-1">{{user.isAdmin ? 'Admin' : 'Regular'}}</span>
          </a>
        </li>
        <li class="flex">
          <a href="#" class="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
            <svg class="group-hover:text-blue-500 mb-1 text-slate-400" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            New User
          </a>
        </li>
      </ul>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import store from "../../store";
import { useRouter } from "vue-router";
import { backendClient } from "../../api";
import { getAccessToken } from "../../core";

const router = useRouter();
const users = store.users;

onMounted(async () => {
  if (!getAccessToken()) {
    router.push({ name: "login" });
  } else {
    if (!store.admin.value) {
      const user = await backendClient().getCurrentUser();
      store.setAdmin(user);
    }

    const users = await backendClient().getUsers();
    store.setUsers(users);
  }
});
</script>