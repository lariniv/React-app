import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoService } from "..";

export const fetchGetTOdosByList = createAsyncThunk(
  "todo/fetchGetTOdosByList",
  async ({ listId }: { listId: string }, { rejectWithValue }) => {
    try {
      const response = await todoService.getTaskByListId(listId);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
