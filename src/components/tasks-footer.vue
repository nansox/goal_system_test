<script setup lang="ts">
import { useTasksListHandler } from "@/stores/tasksListHandler";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

const tasksListHandler = useTasksListHandler();
const { cleanCompleted } = tasksListHandler;
const { PendingTasks, DoneTasks } = storeToRefs(tasksListHandler);
</script>

<template>
  <div class="footer">
    <p class="todo-count">
      <strong>{{ PendingTasks }}</strong> item{{
        PendingTasks === 1 ? "" : "s"
      }}
      left
    </p>
    <div>
      <RouterLink :to="{ name: 'TodoList', params: { mode: '' } }">
        All
      </RouterLink>
      <RouterLink :to="{ name: 'TodoList', params: { mode: 'Active' } }">
        Active
      </RouterLink>
      <RouterLink :to="{ name: 'TodoList', params: { mode: 'Completed' } }">
        Completed
      </RouterLink>
    </div>
    <div>
      <button :occult="!(DoneTasks > 0)" @click="cleanCompleted" type="button">
        Clean completed
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;

  display: flex;
  justify-content: space-between;
  z-index: 1;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);

  & > .todo-count strong {
    font-weight: 300;
  }

  & > :nth-child(2) {
    a {
      color: inherit;
      margin: 3px;
      padding: 3px 7px;
      text-decoration: none;
      border: 1px solid transparent;
      border-radius: 3px;
      &:hover {
        border-color: rgba(175, 47, 47, 0.1);
      }
      &[aria-current="page"] {
        border-color: rgba(175, 47, 47, 0.2);
      }
    }
  }

  & > :last-child button {
    &:hover {
      text-decoration: underline;
    }

    &:active {
      line-height: 20px;
      text-decoration: none;
      cursor: pointer;
    }
  }

  [occult="true"] {
    opacity: 0;
  }
}
</style>
