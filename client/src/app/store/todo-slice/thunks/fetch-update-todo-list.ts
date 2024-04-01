import { createAsyncThunk } from "@reduxjs/toolkit";
import todoListService from "../todo-list-service";

export const fetchUpdateTodoList = createAsyncThunk(
  "todo/fetchUpdateTodoList",
  async (
    { id, data }: { id: string; data: { name: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await todoListService.updateTodoList(id, data);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
