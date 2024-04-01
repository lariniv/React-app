import { createAsyncThunk } from "@reduxjs/toolkit";
import todoListService from "../todo-list-service";
import todoService from "../todo-service";
import { TaskListType } from "../todo-lists-slice";

export const fetchGetAllTodoListsByOwnerId = createAsyncThunk(
  "todo/fetchGetAllTodoListsByOwnerId",
  async ({ ownerId }: { ownerId: string }, { rejectWithValue }) => {
    try {
      const response = await todoListService.getAllTodoListsByOwnerId(ownerId);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      const taskLists = response.data;

      const tasks = await Promise.all(
        taskLists.map(async (list) => {
          const res = await todoService.getTaskByListId(list.id);
          return res.data;
        })
      );

      const data: TaskListType[] = [];
      for (let i = 0; i < taskLists.length; i++) {
        const taskList: TaskListType = {
          id: taskLists[i].id,
          name: taskLists[i].name,
          tasks: [],
        };
        taskList.tasks = tasks[i];
        data.push(taskList);
      }

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
