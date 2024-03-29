import { Task } from "@/app/todo-lists-slice";
import { TaskCard } from "@/entities";
import { Button } from "@/shared/components/ui/button";

import { EllipsisVertical, Plus } from "lucide-react";

export default function TaskList({
  title,
  totalTaskAmount,
  taskArray,
}: {
  title: string;
  totalTaskAmount: number;
  taskArray: Task[];
}) {
  return (
    <div className="w-full  h-full flex flex-col gap-2">
      <div className="flex items-center justify-between border-y-2 p-2 ">
        <div>{title}</div>
        <div className="flex items-center gap-2">
          <div>{totalTaskAmount}</div>
          <EllipsisVertical size={16} className="cursor-pointer" />
        </div>
      </div>

      <div>
        <Button
          variant={"outline"}
          className="border-dashed border-2 w-full flex gap-2"
        >
          <Plus size={20} />
          <p>Add new card</p>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {taskArray.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}
