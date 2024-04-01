import { Edit, EllipsisVertical, Plus, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { AddCardForm, EditListForm, RemoveListForm } from "..";

export default function TaskListMenu() {
  const [isOpen, setIsOen] = useState(false);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target instanceof Element && !e.target.closest(".options")) {
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
      <div onClick={() => setIsOen(!isOpen)} className="options">
        <EllipsisVertical size={16} className="cursor-pointer" />
      </div>
      {isOpen && (
        <div className="absolute font-semibold options z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md w-40 flex flex-col gap-2 max-lg:-translate-x-3/4">
          <AddCardForm selector="options">
            <div className="relative flex cursor-pointer select-none  items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
              <div className="flex gap-2">
                <Plus />
                Add new card
              </div>
            </div>
          </AddCardForm>

          <EditListForm selector="options">
            <div className="relative flex gap-2 cursor-pointer select-none  items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
              <div className="flex gap-2">
                <Edit />
                Edit list
              </div>
            </div>
          </EditListForm>

          <RemoveListForm selector="options">
            <div className="relative flex gap-2 cursor-pointer stroke-destructive  text-destructive select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-destructive/75">
              <div className="flex gap-2">
                <Trash2Icon />
                Delete list
              </div>
            </div>
          </RemoveListForm>
        </div>
      )}
    </div>
  );
}
