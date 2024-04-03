import { Task } from "@/entities";
import { Edit, EllipsisVertical, Info, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { CardPopup, EditTaskForm, RemoveTaskForm } from "..";
import useOutsideClick from "@/shared/hooks/use-outside-hook";

export default function TaskCardMenu({ task }: { task: Task }) {
  const [isOpen, setIsOen] = useState(false);

  useOutsideClick(".card-menu", () => setIsOen(false));

  return (
    <div>
      <div onClick={() => setIsOen(!isOpen)} className="card-menu">
        <EllipsisVertical size={20} className="cursor-pointer" />
      </div>
      {isOpen && (
        <div className="absolute card-menu z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md w-40 flex flex-col gap-2 max-lg:-translate-x-3/4">
          <EditTaskForm selector="card-menu" task={task}>
            <div className="relative flex gap-2 cursor-pointer select-none  items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
              <div className="flex gap-2">
                <Edit />
                Edit task
              </div>
            </div>
          </EditTaskForm>

          <CardPopup selector="card-menu" task={task}>
            <div className="relative flex gap-2 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
              <div className="flex gap-2">
                <Info />
                More
              </div>
            </div>
          </CardPopup>

          <RemoveTaskForm selector="card-menu" taskId={task.id}>
            <div className="relative flex gap-2 cursor-pointer stroke-destructive  text-destructive select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-destructive/75">
              <div className="flex gap-2">
                <Trash2Icon />
                Delete task
              </div>
            </div>
          </RemoveTaskForm>
        </div>
      )}
    </div>
  );
}
