import { configureStore } from "@reduxjs/toolkit";
import todoListsSlice from "./todo-slice/todo-lists-slice";
import activitySlice from "./activity-slice/activity-slice";

const store = configureStore({
  reducer: {
    todo: todoListsSlice,
    activity: activitySlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
