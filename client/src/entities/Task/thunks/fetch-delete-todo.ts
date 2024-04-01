import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoService } from "..";

export const fetchDeleteTodo = createAsyncThunk(
  "todo/fetchDeleteTodo",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await todoService.deleteTask(id);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
