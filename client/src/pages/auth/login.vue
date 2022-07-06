<template>
  <div class="container w-70 mx-auto mt-20 px-4" style="border: 1px solid #000">
    This is the login page
    <form @submit.prevent="login">
      <div class="mb-6">
        <input
          type="text"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Email address"
          v-model="loginCreds.email"
        />
      </div>
      <div class="mb-6">
        <input
          type="text"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Password"
          v-model="loginCreds.password"
        />
      </div>
      <button
        type="submit"
        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        Sign in
      </button>
    </form>
  </div>
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

    const loginCreds = reactive({ email: "", password: "" });

    const login = async () => {
      console.log("Inside login function...");
      try {
        await backendClient().login({
          email: loginCreds.email,
          password: loginCreds.password,
        });
        router.push({ name: "main" });
      } catch (e) {
        store.setMessage({ type: "error", message: e.message });
      }
    };

    return {
      loginCreds,
      login,
    };
  }

});
</script>