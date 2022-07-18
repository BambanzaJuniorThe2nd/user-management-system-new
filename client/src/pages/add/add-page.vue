<template>
    <section>
    <div class="w-80 m-auto text-center mt-20">
        <div class="w-20 h-20 mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
        </div>
        <span class="text-lg text-light">Add user</span>
        <form @submit.prevent="addUser" class="mt-5 p-3 rounded-md bg-customGray border-2 border-opacity-60 border-solid">
            <div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Name</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="addUserCreds.name"
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Email address</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="addUserCreds.email"
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Title</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="addUserCreds.title"
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Birthdate</label>
                    <input
                        type="date"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="addUserCreds.birthDate"
                    />
                </div>
                <div class="mb-5 text-left">
                    <label for="roles" class="text-sm font-light">Role</label>
                    <select id="roles" v-model="addUserCreds.role" class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid">
                        <option v-for="role in userRoles" :key="role" :value="role">{{role}}</option>
                    </select>
                </div>
                <div class="flex flex-row justify-between">
                    <button type="submit" class="w-1/4 bg-blue-600 text-white rounded text-sm py-2 hover:bg-blue-400">Add</button>
                    <button type="submit" class="w-1/4 bg-gray-200 text-black rounded text-sm py-2 hover:bg-gray-400 hover:text-white">Clear</button>
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

    const addUserCreds = reactive(
        { 
            name: "", 
            email: "", 
            title: "", 
            birthDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10), 
            role: "Regular" 
        }
    );
    const userRoles = reactive(["Admin", "Regular"]);

    const addUser = async () => {
      try {
        await backendClient().createUser({
            name: addUserCreds.name,
            email: addUserCreds.email,
            title: addUserCreds.title,
            birthDate: addUserCreds.birthDate,
            isAdmin: addUserCreds.role === "Admin",
        });
        router.push({ name: "add" });
      } catch (e) {
        store.setMessage({ type: "error", message: e.message });
      }
    };

    return {
      addUserCreds,
      userRoles,
      addUser,
    };
  }

});
</script>