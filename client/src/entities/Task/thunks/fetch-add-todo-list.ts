import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoListService } from "..";

export const fetchAddTodoList = createAsyncThunk(
  "todo/fetchAddTodoList",
  async (
    { name, ownerId }: { name: string; ownerId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await todoListService.addTodoList({ name, ownerId });

      if (response.status !== 201) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
