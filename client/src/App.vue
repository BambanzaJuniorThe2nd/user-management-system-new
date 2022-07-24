<template>
  <div>
    <main>
      <!-- navbar -->
      <Navbar 
        :show="showNavbar" 
        @onLogoClick="handleOnLogoClickEvent" 
        @onUsersLinkClick="handleOnUsersLinkClickEvent"
        @onAddNewUserLinkClick="handleOnAddNewUserLinkClickEvent" 
        @onLogout="handleOnLogoutEvent" 
      />

      <!-- Alerts -->
      <Alert :show="showAlert" :type="alertType" :message="alertMessage" @onDismiss="handleDismissAlertEvent"/>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, watch } from "vue";
import store from "./store";
import { useRouter } from "vue-router";
import { AppMessage, getAccessToken, deleteAccessToken } from "./core";
import Navbar from "./ui-components/nav.vue";
import Alert from "./ui-components/alert.vue";
import { backendClient } from "./api";

const router = useRouter();
const showNavbar = ref(false);
const showAlert = ref(false);
const alertType = ref<string>("");
const alertMessage = ref<string>("");

onMounted(async () => {
  if (getAccessToken()) {
    try {
      if (!store.admin.value) {
        await backendClient().getCurrentUser();
        showNavbar.value = true;
        router.push({ name: "main" });
      } else {
        router.push({ name: "login" });
        showNavbar.value = false;
      }
    } catch (e) {
      store.setMessage({ type: "error", message: e.message });
    }
  } else {
    router.push({ name: "login" });
    showNavbar.value = false;
  }
});

watch(store.message, (value) => {
  if (value && value.type) {
    displayAlert(value);
  }
});

const displayAlert = (m: AppMessage) => {
  const { type, message } = m;
  alertMessage.value = `${message}`;

  if (type === "error") {
    alertType.value = "danger";
    alertMessage.value = `${message}`;
  } else {
    alertType.value = "success";
  }

  alertMessage.value = `${message}`;
  showAlert.value = true;
};

const handleDismissAlertEvent = () => {
  showAlert.value = false;
};

const handleOnLogoutEvent = () => {
  deleteAccessToken();
  router.push({ name: "login" });
}

const handleOnLogoClickEvent = () => {
  router.push({ name: "main" });
}

const handleOnUsersLinkClickEvent = () => {
  handleOnLogoClickEvent();
}

const handleOnAddNewUserLinkClickEvent = () => {
  router.push({ name: "add" });
}
</script>
