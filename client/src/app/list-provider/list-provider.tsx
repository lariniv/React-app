import { TaskListType } from "@/entities";
import { createContext, useContext } from "react";

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
