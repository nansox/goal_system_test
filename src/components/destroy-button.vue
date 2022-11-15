<script setup lang="ts">
import { useTasksListHandler } from "@/stores/tasksListHandler";
import { toRefs } from "vue";

const props = defineProps({ index: { type: Number, required: true } });
const { index } = toRefs(props);

const tasksListHandler = useTasksListHandler();

function deleteTask() {
  tasksListHandler.deleteTask(index.value);
}
</script>
<template>
  <button class="destroy" @click="deleteTask"></button>
</template>
<style lang="scss">
button.destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  font-size: 30px;
  color: #cc9a9a;
  transition: color 0.2s ease-out;

  &:after {
    content: "×";
  }

  &:hover {
    color: #af5b5e;
  }
}
</style>
