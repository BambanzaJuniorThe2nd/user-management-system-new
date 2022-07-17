<template>
    <section>
    <!-- navbar -->
    <section class="w-full flex flex-row justify-between bg-black text-white p-3">
      <!-- logo -->
      <div class="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <div class="text-sm">
        <ul class="flex flex-row">
          <li class="mr-7 cursor-pointer">Users</li>
          <li class="cursor-pointer">Add new user</li>
        </ul>
      </div>
      <div class="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </div>
    </section>

    <div class="w-80 m-auto text-center mt-20">
        <div class="w-20 h-20 mx-auto mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="text-lg text-light">Edit user</span>
        <form @submit.prevent="editUser" class="my-5 p-3 rounded-md bg-customGray border-2 border-opacity-60 border-solid">
            <div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Name</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="editUserCreds.name"
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Email address</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="editUserCreds.email"
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Title</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="editUserCreds.title"
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Birthdate</label>
                    <input
                        type="date"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="editUserCreds.birthDate"
                    />
                </div>
                <div class="mb-5 text-left">
                    <label for="roles" class="text-sm font-light">Role</label>
                    <select id="roles" v-model="editUserCreds.role" class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid">
                        <option v-for="role in userRoles" :key="role" :value="role">{{role}}</option>
                    </select>
                </div>
                <div class="flex flex-row justify-between">
                    <button type="submit" class="w-1/5 bg-blue-600 text-white rounded text-sm py-2 hover:bg-blue-400">Save</button>
                    <button type="submit" class="w-1/5 bg-gray-200 text-black rounded text-sm py-2 hover:bg-gray-400 hover:text-white">Reset</button>
                    <button type="submit" class="w-2/5 bg-yellow-400 text-black rounded text-sm py-2 hover:bg-yellow-300 hover:text-black">Change password</button>
                </div>
            </div>
        </form>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { backendClient } from "../../api";
import { useRouter } from "vue-router";
import { getAccessToken } from "../../core/auth";
import store from "@/store";

export default defineComponent({
  setup() {
    const router = useRouter();

    onMounted(() => {
      if (getAccessToken()) {
        router.push({ name: "main" });
      }
    });

    const editUserCreds = reactive(
        { 
            name: "", 
            email: "", 
            title: "", 
            birthDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10), 
            role: "Regular" 
        }
    );
    const userRoles = reactive(["Admin", "Regular"]);

    const editUser = async () => {
      try {
        await backendClient().createUser({
            name: editUserCreds.name,
            email: editUserCreds.email,
            title: editUserCreds.title,
            birthDate: editUserCreds.birthDate,
            isAdmin: editUserCreds.role === "Admin",
        });
        router.push({ name: "add" });
      } catch (e) {
        store.setMessage({ type: "error", message: e.message });
      }
    };

    return {
      editUserCreds,
      userRoles,
      editUser,
    };
  }

});
</script>