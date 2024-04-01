import { createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../todo-service";

export const fetchGetTOdosByList = createAsyncThunk(
  "todo/fetchGetTOdosByList",
  async ({ listId }: { listId: string }, { rejectWithValue }) => {
    try {
      const response = await taskService.getTaskByListId(listId);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
