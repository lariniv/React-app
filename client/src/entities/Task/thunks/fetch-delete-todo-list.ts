import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoListService } from "..";

export const fetchDeleteTodoList = createAsyncThunk(
  "todo/fetchDeleteTodoList",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await todoListService.deleteTodoList(id);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
