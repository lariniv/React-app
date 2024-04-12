import { createAsyncThunk } from "@reduxjs/toolkit";
import { boardService } from "..";

export const fetchDeleteBoard = createAsyncThunk(
  "todo/fetchDeleteBoard",
  async ({ boardId }: { boardId: string }, { rejectWithValue }) => {
    try {
      const response = await boardService.deleteBoard(boardId);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
