<template>
  <div class="w-80 m-auto text-center mt-20">
    <div class="w-20 h-20 mx-auto mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
      </svg>
    </div>
    <span class="text-lg text-light">Sign in</span>
    <form @submit.prevent="login" class="mt-5 p-3 rounded-md bg-gray-50 border-2 border-opacity-60 border-solid border-gray-200">
      <div>
        <div class="mb-5 text-left">
          <label class="text-sm font-medium">Email address</label>
          <input
            type="text"
            class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
            v-model="loginCreds.email"
          />
        </div>
        <div class="mb-5 text-left">
          <label class="text-sm font-medium">Password</label>
          <input
            type="password"
            class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
            v-model="loginCreds.password"
          />
        </div>
        <button type="submit" class="w-full bg-green-600 text-white rounded text-sm py-2 hover:bg-green-400">Sign in</button>
      </div>
    </form>
  </div>
  <!-- <div class="container w-70 mx-auto mt-20 px-4" style="border: 1px solid #000">
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
  </div> -->
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