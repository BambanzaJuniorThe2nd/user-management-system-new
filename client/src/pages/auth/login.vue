<template>
  <div>This is the login page</div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { surixClient } from "../../api";
import { useRouter } from "vue-router";
import { getAccessToken } from "../../core/auth";
import store from "@/store";

export default defineComponent({
  setup() {
    const router = useRouter();

    onMounted(() => {
      if (getAccessToken()) {
        router.push({ name: "dashboard" });
      }
    });

    const loginCreds = reactive({ email: "", password: "" });

    const login = async () => {
      try {
        await surixClient().login({
          email: loginCreds.email,
          password: loginCreds.password,
        });
        router.push({ name: "dashboard" });
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