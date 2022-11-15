import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/todo_list/:mode?",
      name: "TodoList",
      component: () => import("@/views/TodoListView.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/todo_list",
    },
  ],
});

export default router;
