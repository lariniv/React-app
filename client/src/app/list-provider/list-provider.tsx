import { createContext, useContext } from "react";
import { TaskListType } from "../store/todo-slice/todo-lists-slice";

const listProvider = createContext<TaskListType>({} as TaskListType);

export function ListProvider({
  value,
  children,
}: {
  value: TaskListType;
  children: React.ReactNode;
}) {
  return (
    <listProvider.Provider value={value}>{children}</listProvider.Provider>
  );
}

export function useList() {
  return useContext(listProvider);
}
