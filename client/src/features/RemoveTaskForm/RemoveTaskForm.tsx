import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import {
  RemoveActivity,
  TaskList,
  fetchAddActivity,
  fetchDeleteTodo,
} from "@/entities";
import { AppDispatch, useList, RootState, useBoard } from "@/processes";

export default function RemoveTaskForm({
  children,
  selector,
  taskId,
}: {
  children: React.ReactNode;
  taskId: string;
  selector?: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { id: listId } = useList();

  const { id: boardId } = useBoard();

  const boardLists = useSelector((state: RootState) => state.board.taskBoards);

  const board = boardLists.find((board) => board.id === boardId);

  const taskLists = board?.lists;

  const list: TaskList | undefined = taskLists?.find(
    (list) => list.id === listId
  );

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
              const removeAcitityPayload: RemoveActivity = {
                date: new Date(),
                taskId,
                boardId,
                taskName: name,
                targetList: listId,
                type: "REMOVE",
              };

              const ownerId = localStorage.getItem("token");

              if (!ownerId) return;

              dispatch(
                fetchAddActivity({
                  activityData: removeAcitityPayload,
                  ownerId,
                })
              );

              dispatch(fetchDeleteTodo({ id: taskId, boardId }));
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
