import { Board } from "@/entities";
import { createContext, useContext } from "react";

const boardProvider = createContext<Board>({} as Board);

export function BoardProvider({
  value,
  children,
}: {
  value: Board;
  children: React.ReactNode;
}) {
  return (
    <boardProvider.Provider value={value}>{children}</boardProvider.Provider>
  );
}

export function useBoard() {
  return useContext(boardProvider);
}
