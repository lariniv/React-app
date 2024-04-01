import { createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../todo-service";
import { TaskDto } from "../todo-lists-slice";

export const fetchAddTodo = createAsyncThunk(
  "todo/fetchAddTodo",
  async ({ taskData }: { taskData: TaskDto }, { rejectWithValue }) => {
    try {
      const response = await taskService.addTask(taskData);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
