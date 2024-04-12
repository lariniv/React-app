import { TaskList } from "@/entities/Task";

export type Board = {
  id: string;
  name: string;
  lists: TaskList[];
};
