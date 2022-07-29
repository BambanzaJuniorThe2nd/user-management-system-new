<template>
    <section>
    <div class="w-80 m-auto text-center mt-20">
        <div class="w-20 h-20 mx-auto mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="text-lg text-light">Change password</span>
        <form @submit.prevent class="my-5 p-3 rounded-md bg-customGray border-2 border-opacity-60 border-solid">
            <div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">New password</label>
                    <input
                        type="password"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="input.newPassword"
                        required
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Confirm new password</label>
                    <input
                        type="password"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="input.confirmedNewPassword"
                        required
                    />
                </div>
                <div class="flex flex-row justify-between">
                    <button @click="save" class="w-1/4 bg-blue-600 text-white rounded text-sm py-2 hover:bg-blue-400">Save</button>
                    <button @click="reset" class="w-1/4 bg-gray-200 text-black rounded text-sm py-2 hover:bg-gray-400 hover:text-white">Reset</button>
                </div>
            </div>
        </form>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { backendClient } from "../../api";
import { useRouter } from "vue-router";
import { getAccessToken } from "../../core/auth";
import { refreshData } from "../util";
import store from "@/store";

const router = useRouter();
onMounted(async() => {
  await refreshData();
  reset();
});

const input = ref(
  { 
      newPassword: "", 
      confirmedNewPassword: ""
  }
);

const reset = () => {
  input.value = { newPassword: "", confirmedNewPassword: "" };
};

const save = async () => {
  try {
    await backendClient().changePassword(
      store.admin._id,
      {
        password: input.password,
      }
    );
    store.setMessage({ type: "success", message: "Password successfully changed" });
    router.push({ name: "main" });
  } catch (e) {
    store.setMessage({ type: "error", message: e.message });
  }
};
</script>