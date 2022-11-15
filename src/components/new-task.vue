<script setup lang="ts">
import TextInput from "@/components/text-input.vue";
import { useTasksListHandler } from "@/stores/tasksListHandler";
import { ref } from "vue";
import MarkAllSelect from "./mark-all-select.vue";

const inputVModel = ref("");

const tasksListHandler = useTasksListHandler();
const { completeAll, uncompleteAll } = tasksListHandler;

function addTask() {
  if (inputVModel.value === "") return;

  tasksListHandler.addTask(inputVModel.value);
  inputVModel.value = "";
}
</script>

<template>
  <div class="new-todo">
    <MarkAllSelect @complete="completeAll" @uncomplete="uncompleteAll" />
    <TextInput @enterPressed="addTask" v-model="inputVModel" />
  </div>
</template>

<style lang="scss">
.new-todo {
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  padding: 0;
  position: relative;
  width: 100%;

  height: 3rem;

  & > :first-child {
    width: 18px;
    z-index: 1;
    top: 1px;
    bottom: 1px;
    left: 12px;
  }

  & > :last-child {
    box-sizing: content-box;
    top: 0;
    bottom: 0;
    left: -1px;
    right: -1px;
    padding: 6px;
    padding-left: 42px;
    border: 1px solid #99999969;
    &:focus {
      box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    }
  }

  & > * {
    position: absolute;
    border: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
