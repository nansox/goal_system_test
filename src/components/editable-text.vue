<script setup lang="ts">
import TextInput from "@/components/text-input.vue";
import { useTasksListHandler } from "@/stores/tasksListHandler";
import { computed, ref, toRefs, watch } from "vue";

const props = defineProps({ index: { type: Number, required: true } });
const { index } = toRefs(props);
const tasksListHandler = useTasksListHandler();
const storeName = computed(() => tasksListHandler.getTaskName(index.value));
const storePending = computed(() =>
  tasksListHandler.getTaskPending(index.value)
);
const nameVModel = ref(storeName.value);
const editing = ref(false);
const editInput = ref<null | InstanceType<typeof TextInput>>(null);

watch(editing, () => {
  if (editing) nameVModel.value = storeName.value;
});

function onBlur() {
  editing.value = false;

  if (nameVModel.value === "") {
    tasksListHandler.deleteTask(index.value);
    return;
  }

  tasksListHandler.setTaskName(index.value, nameVModel.value);
}
</script>
<template>
  <div class="editable-text">
    <TextInput
      v-if="editing"
      ref="editInput"
      class="edit"
      @blur="onBlur"
      @enter-pressed="editInput?.blur"
      v-model="nameVModel"
    />
    <p v-else @dblclick="editing = true" :pending="storePending">
      {{ storeName }}
    </p>
  </div>
</template>
<style lang="scss">
.editable-text {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin-left: 10px;

  input {
    padding: 0 16px;
    height: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    color: inherit;
    padding: 6px;
    border: 1px solid #99999969;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  & > p[pending="false"] {
    color: #999999;
  }
}
</style>
