import { Edit, EllipsisVertical, Info, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import EditCardForm from "./EditTaskForm";
import RemoveTaskForm from "./RemoveTaskForm";
import CardPopup from "./CardPopup";
import { Task } from "@/app/store/todo-slice/types/task-type";

export default function TaskCardMenu({ task }: { task: Task }) {
  const [isOpen, setIsOen] = useState(false);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target instanceof Element && !e.target.closest(".card-menu")) {
        setIsOen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
  return (
    <div>
      <div onClick={() => setIsOen(!isOpen)} className="card-menu">
        <EllipsisVertical size={20} className="cursor-pointer" />
      </div>
      {isOpen && (
        <div className="absolute card-menu z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md w-40 flex flex-col gap-2">
          <EditCardForm selector="card-menu" task={task}>
            <div className="relative flex gap-2 cursor-pointer select-none  items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
              <div className="flex gap-2">
                <Edit />
                Edit task
              </div>
            </div>
          </EditCardForm>

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
