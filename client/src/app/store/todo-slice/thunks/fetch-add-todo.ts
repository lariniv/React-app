import { createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../todo-service";
import { TaskDto, priority } from "../todo-lists-slice";

export const fetchAddTodo = createAsyncThunk(
  "todo/fetchAddTodo",
  async ({ taskData }: { taskData: TaskDto }, { rejectWithValue }) => {
    try {
      const response = await taskService.addTask(taskData);

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
