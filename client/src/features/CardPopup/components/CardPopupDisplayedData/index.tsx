import { Task, TaskList } from "@/entities";
import { Button } from "@/shared/components/ui/button";
import { Calendar, Crosshair, Edit, Tag } from "lucide-react";

export default function CardPopupDisplayedData({
  task,
  list,
  callback,
}: {
  task: Task;
  list: TaskList | undefined;
  callback: () => void;
}) {
  const { name, description, dueDate, priority } = task;
  return (
    <div className="w-full flex flex-col gap-8 flex-grow px-2 md:pl-8 pt-10 md:pt-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold">{name}</h1>
        <Button variant={"outline"} onClick={callback}>
          <Edit />
          Edit task
        </Button>
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-2">
        <div className="w-full flex">
          <div className="w-1/2 flex gap-3 items-center text-accent-foreground stroke-accent-foreground h-10">
            <Crosshair size={16} />
            Status
          </div>
          <div className="w-1/2 font-semibold flex items-center justify-end">
            {list?.name}
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-1/2 flex gap-3 items-center text-accent-foreground stroke-accent-foreground h-10">
            <Calendar size={16} />
            Due date
          </div>
          <div className="w-1/2 font-semibold flex items-center justify-end">
            {new Date(dueDate).toLocaleDateString("en-UA", {
              weekday: "short",
              day: "numeric",
              month: "long",
            })}
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-1/2 flex gap-3 items-center text-accent-foreground stroke-accent-foreground h-10">
            <Tag size={16} />
            Priority
          </div>
          <div className="w-1/2 capitalize font-semibold flex items-center justify-end">
            {priority.slice(0, 1).toUpperCase() +
              priority.slice(1).toLowerCase()}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h2 className="text-xl font-bold">Desciption</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
