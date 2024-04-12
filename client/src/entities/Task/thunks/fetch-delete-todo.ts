import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoService } from "..";

export const fetchDeleteTodo = createAsyncThunk(
  "todo/fetchDeleteTodo",
  async (
    { id, boardId }: { id: string; boardId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await todoService.deleteTask(id);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return { ...response.data, boardId };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
