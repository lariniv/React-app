import { createSlice } from "@reduxjs/toolkit";
import {
  Activity,
  fetchAddActivity,
  fetchGetActivitiesByOwnerId,
} from "@/entities";

type ActivityState = {
  activityLog: Activity[];
};

const initialState: ActivityState = {
  activityLog: [],
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetActivitiesByOwnerId.fulfilled, (state, action) => {
      state.activityLog = action.payload;
    });

    builder.addCase(fetchAddActivity.fulfilled, (state, action) => {
      state.activityLog.push(action.payload);
    });
  },
});

export default activitySlice.reducer;
