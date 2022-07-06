<template>
  <div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import store from "./store";
import { Message } from "./core";
import { toast } from "tailwind-toast";

export default defineComponent({
  setup() {
    watch(store.message, (value) => {
      if (value && value.type) {
        displayToast(value);
      }
    });

    const displayToast = (m: Message) => {
      const defaultValues = {
        shape: "square",
        duration: 4000,
        speed: 1000,
        positionX: "center",
        positionY: "top",
        color: "white",
      };

      const { type, message } = m;

      if (type === "error") {
        toast()
          .danger("", message)
          .with({
            ...defaultValues,
            color: "bg-red-500",
          })
          .show();
      } else {
        toast()
          .success("", message)
          .with({
            ...defaultValues,
            color: "bg-green-500",
          })
          .show();
      }
    };
  },
});
</script>
