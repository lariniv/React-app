import { createAsyncThunk } from "@reduxjs/toolkit";
import activityService from "../activity-service";

export const fetchGetActivitiesByTaskId = createAsyncThunk(
  "todo/fetchGetActivitiesByTaskId",
  async ({ taskId }: { taskId: string }, { rejectWithValue }) => {
    try {
      const response = await activityService.getActivityByTaskId(taskId);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
