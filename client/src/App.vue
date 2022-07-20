<template>
  <div>
    <main>
      <!-- navbar -->
      <section v-if="!showNavbar" class="w-full flex flex-row justify-between bg-black text-white p-3">
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

      <!-- Alerts -->
      <div v-if="showAlert" class="w-1/3 mx-auto mt-3">
        <div :class="classnames" role="alert">
          <svg aria-hidden="true" class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Info</span>
          <div v-if="isSuccessAlert">
            <span class="font-medium">Success alert!</span> {{alertMessage}}
          </div>
          <div v-else>
            <span class="font-medium">Danger alert!</span> {{alertMessage}}
          </div>
          <button type="button" :class="classnames" data-dismiss-target="#alert-1" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
      </div>

      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, watch } from "vue";
import store from "./store";
import { AppMessage, getAccessToken } from "./core";
import { toast } from "tailwind-toast";

const showNavbar = ref(false);
const showAlert = ref(false);
const isSuccessAlert = ref(false);
const alertMessage = ref<string>("");
const classnames = ref<string>("flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800");

onMounted(() => {
  if (getAccessToken()) {
    showNavbar.value = true;
  }
});

watch(store.message, (value) => {
  if (value && value.type) {
    displayAlert(value);
  }
});

const displayAlert = (m: AppMessage) => {
  const defaultValues = {
    shape: "square",
    duration: 4000,
    speed: 1000,
    positionX: "center",
    positionY: "top",
    color: "white",
  };

  const { type, message } = m;
  alertMessage.value = message;

  if (type === "error") {
    isSuccessAlert.value = false;
    classnames.value = "flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800";
  } else {
    isSuccessAlert.value = true;
    classnames.value = "flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800";
  }

  showAlert.value = true;
};
</script>
