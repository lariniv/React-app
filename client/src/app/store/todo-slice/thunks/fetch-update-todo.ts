import { createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../todo-service";
import { TaskDto } from "../todo-lists-slice";

export const fetchUpdateTodo = createAsyncThunk(
  "todo/fetchUpdateTodo",
  async (
    { id, data }: { id: string; data: Partial<TaskDto> },
    { rejectWithValue }
  ) => {
    try {
      const response = await taskService.updateTask(id, data);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
