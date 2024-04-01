import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAddTodo } from "./thunks/fetch-add-todo";
import {
  fetchAddTodoList,
  fetchDeleteTodoList,
  fetchGetAllTodoListsByOwnerId,
  fetchUpdateTodoList,
} from "./thunks";
import { fetchDeleteTodo } from "./thunks/fetch-delete-todo";
import { fetchUpdateTodo } from "./thunks/fetch-update-todo";
import { TaskListType } from "./types/task-list-type";
import { Task } from "./types/task-type";

type TaskListState = {
  taskLists: TaskListType[];
};

const initialState: TaskListState = {
  taskLists: [],
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    moveTodo: (
      state,
      action: PayloadAction<{
        sourceListId: string;
        targetListId: string;
        taskId: string;
      }>
    ) => {
      const { sourceListId, targetListId, taskId } = action.payload;

      const sourceList = state.taskLists.find(
        (list) => list.id === sourceListId
      );
      const targetList = state.taskLists.find(
        (list) => list.id === targetListId
      );

      if (sourceList && targetList) {
        const task = sourceList.tasks.find((task) => task.id === taskId);

        if (task) {
          sourceList.tasks = sourceList.tasks.filter(
            (task) => task.id !== taskId
          );
          targetList.tasks.push(task);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddTodo.fulfilled, (state, action) => {
      const { id, name, description, dueDate, listId, priority } =
        action.payload;

      const task: Task = {
        id,
        name,
        description,
        dueDate: new Date(dueDate),
        priority,
      };

      const list = state.taskLists.find((list) => list.id === listId);

      if (list) {
        list.tasks.push(task);
      }
    });

    builder.addCase(fetchAddTodoList.fulfilled, (state, action) => {
      state.taskLists.push({
        id: action.payload.id,
        name: action.payload.name,
        tasks: [],
      });
    });

    builder.addCase(fetchDeleteTodo.fulfilled, (state, action) => {
      const { id, listId } = action.payload;
      const list = state.taskLists.find((list) => list.id === listId);
      if (list) {
        list.tasks = list.tasks.filter((task) => task.id !== id);
      }
    });

    builder.addCase(fetchDeleteTodoList.fulfilled, (state, action) => {
      state.taskLists = state.taskLists.filter(
        (list) => list.id !== action.payload.id
      );
    });

    builder.addCase(
      fetchGetAllTodoListsByOwnerId.fulfilled,
      (state, action) => {
        state.taskLists = action.payload;
      }
    );

    builder.addCase(fetchUpdateTodo.fulfilled, (state, action) => {
      const { id, name, description, dueDate, listId, priority } =
        action.payload;

      const task: Task = {
        id,
        name,
        description,
        dueDate,
        priority,
      };

      const list = state.taskLists.find((list) => list.id === listId);
      if (list) {
        const taskIndex = list.tasks.findIndex((task) => task.id === id);
        list.tasks[taskIndex] = task;
      }
    });

    builder.addCase(fetchUpdateTodoList.fulfilled, (state, action) => {
      const { id, name } = action.payload;
      const list = state.taskLists.find((list) => list.id === id);
      if (list) {
        list.name = name;
      }
    });
  },
});

export const { moveTodo } = taskListSlice.actions;
export default taskListSlice.reducer;
