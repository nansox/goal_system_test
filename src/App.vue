<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div>
      <nav class="app-nav">
        <div>
          <RouterLink to="/todo_list">Todo List</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss">
.app-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: rgb(175, 47, 47);
  display: flex;
  padding: 10px 100px;

  div {
    background: #afafaf;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    font-weight: 700;
    a {
      text-decoration: none;
      color: #4e4e4e;

      &[aria-current="page"] {
        color: black;
      }
    }
  }
}
</style>
