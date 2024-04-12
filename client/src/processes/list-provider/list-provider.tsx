import { TaskList } from "@/entities";
import { createContext, useContext } from "react";

const listProvider = createContext<TaskList>({} as TaskList);

export function ListProvider({
  value,
  children,
}: {
  value: TaskList;
  children: React.ReactNode;
}) {
  return (
    <listProvider.Provider value={value}>{children}</listProvider.Provider>
  );
}

export function useList() {
  return useContext(listProvider);
}
