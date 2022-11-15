<script lang="ts">
import { onMounted, ref, defineComponent, toRefs, computed } from "vue";

export default defineComponent({
  emits: ["update:modelValue", "blur", "enterPressed"],
  props: { modelValue: { type: String, default: "" } },
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    const input = ref<null | HTMLInputElement>(null);

    const vModel = computed({
      get: () => modelValue.value,
      set: (nVal: string) => {
        emit("update:modelValue", nVal);
      },
    });

    function onEnter() {
      emit("enterPressed", vModel.value);
    }
    function focus() {
      input.value?.focus();
    }
    function blur() {
      input.value?.blur();
    }
    function clean() {
      if (vModel.value !== null) vModel.value = "";
    }
    onMounted(() => {
      focus();
    });

    return { onEnter, clean, focus, blur, input, vModel };
  },
});
</script>

<template>
  <input
    ref="input"
    class="text-input"
    type="text"
    @blur="$emit('blur')"
    @keypress.enter="onEnter"
    v-model="vModel"
  />
</template>

<style>
input.text-input {
  line-height: 1.4em;
  font-size: 24px;
}
</style>
