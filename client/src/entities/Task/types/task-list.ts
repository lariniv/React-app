import { Task } from "./task";

export type TaskList = {
  id: string;
  name: string;
  tasks: Task[];
  boardId: string;
};
