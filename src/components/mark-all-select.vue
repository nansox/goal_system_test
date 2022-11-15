<script setup lang="ts">
import { nextTick, ref } from "vue";

const selectVModel = ref("");

const emit = defineEmits(["complete", "uncomplete"]);

function onInput(event: Event) {
  const selected = (event.currentTarget as unknown as { value: string }).value;

  if (typeof selected !== "string" || selected === "") return;

  if (selected === "COMPLETED") emit("complete");
  else if (selected === "UNCOMPLETED") emit("uncomplete");

  nextTick(() => (selectVModel.value = ""));
}
</script>

<template>
  <select @input.stop="onInput" v-model="selectVModel">
    <option hidden></option>
    <option>COMPLETED</option>
    <option>UNCOMPLETED</option>
  </select>
</template>

<style lang="scss" scoped>
select {
  width: 18px;
  z-index: 1;
  top: 1px;
  bottom: 1px;
  left: 12px;
}
</style>
