import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoListService } from "..";

export const fetchAddTodoList = createAsyncThunk(
  "todo/fetchAddTodoList",
  async (
    { name, boardId }: { name: string; boardId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await todoListService.addTodoList({ name, boardId });
      if (response.status !== 201) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
