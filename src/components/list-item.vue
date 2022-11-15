<script setup lang="ts">
import { computed, toRefs, ref } from "vue";
import DestroyButton from "./destroy-button.vue";
import TaskCheckbox from "./task-checkbox.vue";
import EditableText from "./editable-text.vue";
import { useTasksListHandler } from "@/stores/tasksListHandler";

const props = defineProps({ index: { type: Number, required: true } });

const { index } = toRefs(props);

const tasksListHandler = useTasksListHandler();

const refreshCheckboxCont = ref(0);

const checkboxVModel = computed({
  get: () => {
    refreshCheckboxCont.value = refreshCheckboxCont.value + 1;
    return !tasksListHandler.getTaskPending(index.value);
  },
  set: (nVal: boolean) => tasksListHandler.setTaskPending(index.value, !nVal),
});
</script>

<template>
  <li :class="{ editing: true, completed: true }">
    <TaskCheckbox v-model:checked="checkboxVModel" :key="refreshCheckboxCont" />
    <EditableText :index="index" />
    <DestroyButton :index="index" />
  </li>
</template>
<style lang="scss">
li {
  height: 40px;
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  display: flex;
  &:last-child {
    border-bottom: none;
  }

  &.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }

  &:hover .destroy {
    display: block;
  }
  &.editing:last-child {
    margin-bottom: -1px;
  }
}
</style>
