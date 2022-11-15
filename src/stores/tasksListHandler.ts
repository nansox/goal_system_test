import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export interface TaskItem {
  pending: boolean;
  name: string;
}

export const useTasksListHandler = defineStore("TasksListHandler", () => {
  const taskList = ref<TaskItem[]>([]);
  const tasksFilter = ref<"" | "Active" | "Completed">("");

  const Tasks = computed(() => {
    if (tasksFilter.value === "") return taskList.value;

    return taskList.value.filter((task) =>
      checkTaskStatus(tasksFilter.value, task.pending)
    );
  });
  const Empty = computed(() => taskList.value.length === 0);

  const PendingTasks = computed(
    () => taskList.value.filter((task) => task.pending).length
  );
  const DoneTasks = computed(
    () => taskList.value.filter((task) => !task.pending).length
  );

  function getOriginalIndex(filteredIndex: number) {
    const obj = Tasks.value[filteredIndex];
    return taskList.value.findIndex((task) => obj === task);
  }

  const deleteTask = (index: number) =>
    taskList.value.splice(getOriginalIndex(index)!, 1);

  const getTaskName = computed(
    () => (index: number) => Tasks.value[index].name
  );
  const setTaskName = (index: number, name: string) =>
    (taskList.value[getOriginalIndex(index)].name = name);

  const getTaskPending = computed(
    () => (index: number) => Tasks.value[index].pending
  );
  const setTaskPending = (index: number, pending: boolean) =>
    (taskList.value[getOriginalIndex(index)].pending = pending);

  function changeAllStatus(newStatus: boolean) {
    let index = taskList.value.length;

    while (index-- > 0) taskList.value[index].pending = newStatus;
  }

  return {
    taskList,
    tasksFilter,
    Tasks,
    Empty,
    PendingTasks,
    DoneTasks,
    deleteTask,
    getTaskName,
    setTaskName,
    getTaskPending,
    setTaskPending,
    addTask(name: string) {
      taskList.value.unshift(reactive({ pending: true, name }));
    },
    completeAll: () => changeAllStatus(false),
    uncompleteAll: () => changeAllStatus(true),
    cleanCompleted: () => {
      let index = taskList.value.length;
      const indexToDelete: number[] = [];

      while (--index >= 0)
        if (!taskList.value[index].pending) indexToDelete.push(index);

      indexToDelete.map((index) => taskList.value.splice(index, 1));
    },
    setFilter(value: "" | "Active" | "Completed") {
      tasksFilter.value = value;
    },
  };
});

function checkTaskStatus(value: string, pending: boolean) {
  if (value === "Active") return pending;

  return !pending;
}
