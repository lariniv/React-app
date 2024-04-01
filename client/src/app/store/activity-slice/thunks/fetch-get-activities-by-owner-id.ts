import { createAsyncThunk } from "@reduxjs/toolkit";
import activityService from "../activity-service";

export const fetchGetActivitiesByOwnerId = createAsyncThunk(
  "todo/fetchGetActivitiesByOwnerId",
  async ({ ownerId }: { ownerId: string }, { rejectWithValue }) => {
    try {
      const response = await activityService.getActivitiesByOwnerId(ownerId);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
