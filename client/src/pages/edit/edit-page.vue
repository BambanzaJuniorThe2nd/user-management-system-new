<template>
    <section>
    <div class="w-80 m-auto text-center mt-20">
        <div class="w-20 h-20 mx-auto mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="text-lg text-light">Edit user</span>
        <form @submit.prevent class="my-5 p-3 rounded-md bg-customGray border-2 border-opacity-60 border-solid">
            <div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Name</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="details.name"
                        required
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Email address</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="details.email"
                        required
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Title</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="details.title"
                        required
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Birthdate</label>
                    <input
                        type="date"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="details.birthdate"
                        required
                    />
                </div>
                <div class="mb-5 text-left">
                    <label for="roles" class="text-sm font-light">Role</label>
                    <select id="roles" v-model="details.role" class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid">
                        <option v-for="role in userRoles" :key="role" :value="role">{{role}}</option>
                    </select>
                </div>
                <div class="flex flex-row justify-between">
                    <button @click="editUser" type="submit" class="w-1/5 bg-blue-600 text-white rounded text-sm py-2 hover:bg-blue-400">Save</button>
                    <button @click="reset" class="w-1/5 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Reset</button>
                    <button v-if="displayChangePasswordButton" @click="changePassword" class="w-2/5 bg-yellow-400 text-black rounded text-sm py-2 hover:bg-yellow-300 hover:text-black">Change password</button>
                    <button v-else @click="resetPassword" class="w-2/5 bg-yellow-400 text-black rounded text-sm py-2 hover:bg-yellow-300 hover:text-black">Reset Password</button>
                </div>
            </div>
        </form>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, watch, computed } from "vue";
import { backendClient } from "@/api";
import { useRouter, useRoute } from "vue-router";
import store from "@/store";
import { refreshData, getSelectedUser, userDataFormatted, isSelectedUserAdmin } from "../util";

const router = useRouter();
const route = useRoute();
const details = ref(
  { 
      name: "", 
      email: "", 
      title: "", 
      birthdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10), 
      role: "Regular"
  }
);
const userRoles = reactive(["Admin", "Regular"]);

onMounted(async () => {
  await refreshData();
  reset();
});

const editUser = async () => {
  try {
    await backendClient().updateUser(
      route.params.id,
      { 
        name: details.value.name,
        email: details.value.email,
        title: details.value.title,
        birthdate: details.value.birthdate,
        isAdmin: details.value.role === "Admin",
      }
    );
    store.setMessage({ type: "success", message: "User successfully updated" });
    router.push({ name: "main" });
  } catch (e) {
    store.setMessage({ type: "error", message: e.message });
  }
};

const reset = () => {
  const formattedData = userDataFormatted(getSelectedUser(route.params.id).value);
  details.value = { ...formattedData }
};

const displayChangePasswordButton = computed(() => {
  return isSelectedUserAdmin();
});
</script>