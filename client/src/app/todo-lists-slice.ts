// slices/taskListSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
};

export type TaskList = {
  id: string;
  name: string;
  tasks: Task[];
};

type TaskListState = {
  taskLists: TaskList[];
};

const initialState: TaskListState = {
  taskLists: [],
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addTaskList: (state, action: PayloadAction<{ name: string }>) => {
      state.taskLists.push({
        id: Date.now().toString(),
        name: action.payload.name,
        tasks: [],
      });
    },

    removeTaskList: (state, action: PayloadAction<{ listId: string }>) => {
      state.taskLists = state.taskLists.filter(
        (list) => list.id !== action.payload.listId
      );
    },

    addTask: (
      state,
      action: PayloadAction<{ listId: string; task: Omit<Task, "id"> }>
    ) => {
      const list = state.taskLists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        list.tasks.push({
          id: Date.now().toString(),
          ...action.payload.task,
        });
      }
    },

    removeTask: (
      state,
      action: PayloadAction<{ taskId: string; listId: string }>
    ) => {
      const list = state.taskLists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        list.tasks = list.tasks.filter(
          (task) => task.id !== action.payload.taskId
        );
      }
    },

    moveTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        sourceListId: string;
        targetListId: string;
      }>
    ) => {
      const sourceList = state.taskLists.find(
        (list) => list.id === action.payload.sourceListId
      );
      const taskIndex = sourceList?.tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      const task =
        taskIndex !== undefined && sourceList
          ? sourceList.tasks.splice(taskIndex, 1)[0]
          : null;

      if (task) {
        const targetList = state.taskLists.find(
          (list) => list.id === action.payload.targetListId
        );
        targetList?.tasks.push(task);
      }
    },
  },
});

export const { addTaskList, addTask, moveTask } = taskListSlice.actions;

export default taskListSlice.reducer;
