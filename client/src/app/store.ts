import { configureStore } from "@reduxjs/toolkit";
import todoListsSlice from "./todo-lists-slice";

const store = configureStore({
  reducer: todoListsSlice,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
