import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";

import { removeTask } from "@/app/store/todo-slice/todo-lists-slice";
import { useState } from "react";
import { useList } from "@/app/list-provider/list-provider";
import { addRemoveActivity } from "@/app/store/activity-slice/activity-slice";
import { RootState } from "@/app/store/store";

export default function RemoveTaskForm({
  children,
  selector,
  taskId,
}: {
  children: React.ReactNode;
  taskId: string;
  selector?: string;
}) {
  const dispatch = useDispatch();

  const { id: listId } = useList();

  const taskLists = useSelector((state: RootState) => state.todo.taskLists);

  const list = taskLists.find((list) => list.id === listId);

  const name = list?.tasks.find((task) => task.id === taskId)?.name as string;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        className={selector}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent
        className={selector}
        customOnClick={() => setIsOpen(false)}
      >
        <DialogHeader className="font-bold mx-auto text-2xl">
          Are you sure? This is irreversible!
        </DialogHeader>
        <div className="flex gap-1">
          <Button
            className="w-1/2"
            onClick={() => {
              dispatch(
                addRemoveActivity({
                  taskId,
                  targetList: listId,
                  type: "remove",
                  taskName: name,
                })
              );
              dispatch(removeTask({ listId, taskId }));
              setIsOpen(false);
            }}
          >
            Yes
          </Button>
          <Button
            className="w-1/2"
            variant={"outline"}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
