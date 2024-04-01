import { createAsyncThunk } from "@reduxjs/toolkit";
import { Activity, activityService } from "..";

export const fetchAddActivity = createAsyncThunk(
  "todo/fetchAddActivity",
  async (
    {
      activityData,
      ownerId,
      listId,
    }: { activityData: Activity; ownerId: string; listId?: string },
    { rejectWithValue }
  ) => {
    try {
      let response;
      activityData.date = new Date(activityData.date);

      if (activityData.type === "ADD") {
        const { date, listName, taskName, type } = activityData;
        const data = { date, listName, taskName, type, listId };
        response = await activityService.addListActivity(data, ownerId);
      } else {
        response = await activityService.addActivity(activityData, ownerId);
      }

      if (response.status !== 201) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
