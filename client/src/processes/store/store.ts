import { configureStore } from "@reduxjs/toolkit";
import activitySlice from "./activity-slice/activity-slice";
import boardSlice from "./board-slice/board-slice";

const store = configureStore({
  reducer: {
    board: boardSlice,
    activity: activitySlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
