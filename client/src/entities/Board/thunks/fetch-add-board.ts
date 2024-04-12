import { createAsyncThunk } from "@reduxjs/toolkit";
import { boardService } from "../services";
import { BoardDto } from "../types";

export const fetchAddBoard = createAsyncThunk(
  "todo/fetchAddBoard",
  async ({ name, ownerId }: BoardDto, { rejectWithValue }) => {
    try {
      const response = await boardService.addBoard({ name, ownerId });

      if (response.status !== 201) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
