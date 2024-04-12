import { createAsyncThunk } from "@reduxjs/toolkit";
import { boardService } from "..";
import { BoardDto } from "..";

export const fetchUpdateBoard = createAsyncThunk(
  "todo/fetchUpdateBoard",
  async (
    { boardId, data }: { boardId: string; data: Partial<BoardDto> },
    { rejectWithValue }
  ) => {
    try {
      const response = await boardService.updateBoard(boardId, data);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
