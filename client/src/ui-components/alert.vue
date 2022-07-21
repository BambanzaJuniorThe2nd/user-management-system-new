<template>
    <div v-if="show" class="w-1/3 mx-auto mt-3">
        <div id="alert-1" :class="getClasses" role="alert">
            <svg class="flex-shrink-0 w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <div class="ml-3 text-sm font-medium text-white">
            {{getMessage}}
            </div>
            <button type="button" @click="$emit('onDismiss')" class="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex h-8 w-8 text-white" data-dismiss-target="#alert-1" aria-label="Close">
            <span class="sr-only">Dismiss</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps<{
    show: boolean;
    type: string;
    message: string;
}>();

const ALERT_SUCCESS_CLASSES = "flex p-4 mb-4 rounded-lg bg-gradient-to-br from-green-400 to-green-700";
const ALERT_DANGER_CLASSES = "flex p-4 mb-4 rounded-lg bg-gradient-to-br from-red-200 to-red-500";

const emits = defineEmits(['onDismiss']);

const getMessage = computed(() => {
    return props.type === "success" ? `Success alert! ${props.message}` : `Danger alert! ${props.message}`;
});

const getClasses = computed(() => {
    return props.type === "success" ? ALERT_SUCCESS_CLASSES : ALERT_DANGER_CLASSES;
});


</script>