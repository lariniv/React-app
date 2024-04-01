import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskDto, priority, todoService } from "..";

export const fetchAddTodo = createAsyncThunk(
  "todo/fetchAddTodo",
  async ({ taskData }: { taskData: TaskDto }, { rejectWithValue }) => {
    try {
      const response = await todoService.addTask(taskData);

      if (response.status !== 201) {
        return rejectWithValue(response.data);
      }

      const data = response.data;
      data.priority = data.priority.toLowerCase() as priority;

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
