import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { TaskCard } from "./components";

import { Task } from "@/entities";
import { AddCardForm, TaskListMenu } from "@/features";

export default function TaskList({
  title,
  totalTaskAmount,
  taskArray,
}: {
  title: string;
  totalTaskAmount: number;
  taskArray: Task[];
}) {
  //Vercel commit
  return (
    <div className="w-full  h-full flex flex-col gap-2">
      <div className="flex items-center justify-between border-y-2 p-2 ">
        <div className="text-3xl font-semibold md:text-base md:font-normal">
          {title}
        </div>
        <div className="flex items-center gap-2">
          <div>{totalTaskAmount}</div>
          <TaskListMenu />
        </div>
      </div>

      <div className="w-full">
        <AddCardForm selector="w-full">
          <Button
            variant={"outline"}
            className="border-dashed border-2 w-full flex gap-2 justify-center"
          >
            <Plus size={20} />
            <p>Add new card</p>
          </Button>
        </AddCardForm>
      </div>

      <div className="flex flex-col gap-2">
        {taskArray.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}
