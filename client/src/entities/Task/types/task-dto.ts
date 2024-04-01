import { priority } from "./priority-enum";

export type TaskDto = {
  name: string;
  description: string;
  dueDate: Date;
  priority: priority;
  listId: string;
};
