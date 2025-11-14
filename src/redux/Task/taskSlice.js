// taskSlice.js
import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  user: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action) {
      const { id, updatedTask } = action.payload;
      console.log(id, updatedTask, "id, updated task");
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask(state, action) {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    addUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { addTask, updateTask, deleteTask, addUser, clearUser } =
  taskSlice.actions;

// Selector for filtering completed tasks
// export const selectCompletedTasks = (state) =>
//   state.tasks.filter((task) => task.completed);

export const selectCompletedTasks = createSelector(
  (state) => state.tasks,
  (tasks) => tasks.filter((task) => task.completed)
);

// // Selector for filtering important tasks
// export const selectImportantTasks = (state) =>
//   state.tasks.filter((task) => task.important);

// export const selectToDoTasks = (state) =>
//   state.tasks.filter((task) => !task.completed);

export const selectToDoTasks = createSelector(
  (state) => state.tasks,
  (tasks) => tasks.filter((task) => !task.completed)
);

export const selectImportantTasks = createSelector(
  (state) => state.tasks,
  (tasks) => tasks.filter((task) => task.important)
);

export const selectPrioritizedTasks = createSelector(
  (state) => state.tasks,
  (tasks) =>
    tasks.slice().sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
);

export default taskSlice.reducer;
