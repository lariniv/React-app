import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskDto, todoService } from "..";

export const fetchUpdateTodo = createAsyncThunk(
  "todo/fetchUpdateTodo",
  async (
    {
      id,
      data,
      boardId,
    }: { id: string; data: Partial<TaskDto>; boardId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await todoService.updateTask(id, data);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return { ...response.data, boardId };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
