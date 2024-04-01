import { createAsyncThunk } from "@reduxjs/toolkit";
import todoListService from "../todo-list-service";

export const fetchGetAllTodoListsByOwnerId = createAsyncThunk(
  "todo/fetchGetAllTodoListsByOwnerId",
  async ({ ownerId }: { ownerId: string }, { rejectWithValue }) => {
    try {
      const response = await todoListService.getAllTodoListsByOwnerId(ownerId);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      console.log(response.data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
