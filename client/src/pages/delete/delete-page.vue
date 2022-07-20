<template>
    <section>
    <div class="w-80 m-auto text-center mt-20">
        <div class="w-20 h-20 mx-auto mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z" />
          </svg>
        </div>
        <span class="text-lg text-light">Delete user</span>
        <form @submit.prevent="deleteUser" class="my-5 p-3 rounded-md bg-customGray border-2 border-opacity-60 border-solid">
            <div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Name</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="userCreds.name"
                        readonly
                        disabled
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Email address</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="userCreds.email"
                        readonly
                        disabled
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Title</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="userCreds.title"
                        readonly
                        disabled
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Birthdate</label>
                    <input
                        type="date"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="userCreds.birthDate"
                        readonly
                        disabled
                    />
                </div>
                <div class="mb-5 text-left">
                    <label class="text-sm font-light">Role</label>
                    <input
                        type="text"
                        class="form-control w-full rounded-md p-1 text-sm bg-white border-gray-200 mt-2 border-2 border-opacity-80 border-solid"
                        v-model="userCreds.isAdmin"
                        readonly
                        disabled
                    />
                </div>
                <DeleteDialog :buttonText="buttonText" :dialogText="dialogText" :buttonClassnames="buttonClassnames" @onConfirm="handleOnConfirmEvent" />
            </div>
        </form>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, ref, onMounted } from "vue";
import { backendClient } from "../../api";
import { useRouter } from "vue-router";
import { getAccessToken } from "../../core/auth";
import DeleteDialog from "../../ui-components/dialog.vue";
import store from "@/store";

const router = useRouter();
    
onMounted(() => {
  if (getAccessToken()) {
    router.push({ name: "main" });
  }
});

const userCreds = reactive(
  { 
      name: "", 
      email: "", 
      title: "", 
      birthDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10), 
      role: "Regular" 
  }
);
const userRoles = reactive(["Admin", "Regular"]);
const buttonText = "Delete";
const dialogText = "Are you sure you want to delete this user?";
const buttonClassnames = "w-full bg-red-600 text-white rounded text-sm py-2 hover:bg-red-400"
const showDialog = ref(false);

const deleteUser = async () => {
  console.log("event onConfirm launched...");
  // try {
  //   await backendClient().deleteUser({
  //       name: editUserCreds.name,
  //       email: editUserCreds.email,
  //       title: editUserCreds.title,
  //       birthDate: editUserCreds.birthDate,
  //       isAdmin: editUserCreds.role === "Admin",
  //   });
  //   router.push({ name: "add" });
  // } catch (e) {
  //   store.setMessage({ type: "error", message: e.message });
  // }
};

const displayDialog = () => {
  showDialog.value = !showDialog.value;
}

const handleOnConfirmEvent = () => {
  console.log("Handling onConfirm event...");
}

// return {
//   userCreds,
//   userRoles,
//   dialogText,
//   showDialog,
//   displayDialog,
//   deleteUser,
// };
</script>