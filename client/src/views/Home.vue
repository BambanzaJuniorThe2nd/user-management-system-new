<template>
  <user-list />
</template>

<script lang="ts">
import Vue from "vue";
import UserList from "../components/UserList.vue";
export default Vue.extend({
  name: "home",
  components: {
    UserList,
  },
});
</script>
