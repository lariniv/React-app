import { priority } from "./priority-enum";

export type Task = {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  priority: priority;
};
