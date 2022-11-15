<script setup lang="ts">
import NewTask from "@/components/new-task.vue";
import TasksList from "@/components/task-list.vue";
import TasksFooter from "@/components/tasks-footer.vue";
import { useTasksListHandler } from "@/stores/tasksListHandler";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useRoute } from "vue-router";

const tasksListHandler = useTasksListHandler();
const { setFilter } = tasksListHandler;
const { Empty } = storeToRefs(tasksListHandler);

const route = useRoute();

watch(
  () => route.params.mode,
  () => {
    setFilter(route.params.mode as "" | "Active" | "Completed");
  },
  { immediate: true }
);
</script>

<template>
  <div class="todoapp">
    <h1>todos</h1>
    <div>
      <NewTask type="text" />
      <template v-if="!Empty">
        <TasksList />
        <TasksFooter />
      </template>
    </div>
    <div></div>
  </div>
</template>

<style>
.todoapp {
  background: #fff;
  margin: 200px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}
</style>
