<script setup lang="ts">
import { useTasksListHandler } from "@/stores/tasksListHandler";
import ListItem from "./list-item.vue";
import { storeToRefs } from "pinia";

const tasksListHandler = useTasksListHandler();
const { Tasks } = storeToRefs(tasksListHandler);
</script>

<template>
  <ul class="todo-list">
    <ListItem v-for="(task, index) of Tasks" :index="index" />
  </ul>
</template>

<style>
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
