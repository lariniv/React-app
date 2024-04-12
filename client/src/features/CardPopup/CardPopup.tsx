import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { cn } from "@/shared/lib/utils";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Task } from "@/entities";
import { CardActivityItem } from "..";
import { CardPopupDisplayedData, CardPopupForm } from "./components/";
import { RootState, useBoard, useList } from "@/processes";

export default function EditCardForm({
  children,
  selector,
  task,
}: {
  children: React.ReactNode;
  selector?: string;
  task: Task;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useList();

  const { id: boardId } = useBoard();

  const taskBoards = useSelector((state: RootState) => state.board.taskBoards);

  const taskLists = taskBoards.find((board) => board.id === boardId)?.lists;

  const activityLog = useSelector(
    (state: RootState) => state.activity.activityLog
  );

  const taskActivities = activityLog.filter(
    (activity) => task.id === activity.taskId
  );

  const list = useMemo(
    () => taskLists && taskLists.find((list) => list.id === id),
    [taskLists, id]
  );

  return (
    <Dialog>
      <DialogTrigger className={selector}>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-7xl w-full h-[60vh] overflow-y-auto p-0 border-0 flex flex-col gap-0",
          selector
        )}
      >
        <div className="w-full h-10 bg-secondary relative -z-50 rounded-t-lg"></div>
        <div className="w-full grid grid-cols-1 md:grid-cols-[5fr,3fr] gap-8 flex-grow">
          {!isEditing && (
            <CardPopupDisplayedData
              task={task}
              list={list}
              callback={() => setIsEditing(!isEditing)}
            />
          )}

          {isEditing && (
            <CardPopupForm task={task} callback={() => setIsEditing(false)} />
          )}

          <div className="w-full bg-secondary/50 px-2 md:pl-8 pt-2 md:pt-8  ">
            <h3 className="text-xl font-bold h-10 flex items-center">
              Activity
            </h3>
            <ul className="flex flex-col gap-2 lg:pr-4 max-h-[52vh]">
              {taskActivities.map((activity) => (
                <CardActivityItem key={activity.id} activity={activity} />
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
