<template>
  <div class="todo-checkbox">
    <input class="toggle" type="checkbox" v-model="vModel" />
    <label></label>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from "vue";

const emit = defineEmits(["update:checked"]);
const props = defineProps({ checked: Boolean });
const { checked } = toRefs(props);

const vModel = computed({
  get: () => checked.value,
  set: (nVal: boolean) => emit("update:checked", nVal),
});
</script>
<style lang="scss" scoped>
.todo-checkbox {
  position: relative;

  &,
  & > * {
    height: 40px;
    width: 40px;
  }

  .toggle {
    z-index: 1;
    position: absolute;
    text-align: center;
    -webkit-appearance: none;
    appearance: none;
    opacity: 0;
    margin: 0;

    & + label {
      background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center left;
    }

    &:checked + label {
      background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
    }
  }
  label {
    position: absolute;
    word-break: break-all;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }
}
</style>
