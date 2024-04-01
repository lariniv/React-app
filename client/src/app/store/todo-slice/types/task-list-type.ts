import { Task } from "./task-type";

export type TaskListType = {
  id: string;
  name: string;
  tasks: Task[];
};
