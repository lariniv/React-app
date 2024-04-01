import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { Task } from "@/app/store/todo-slice/todo-lists-slice";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Calendar, Crosshair, Edit, Tag } from "lucide-react";
import { useList } from "@/app/list-provider/list-provider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useMemo, useState } from "react";
import EditCardPopupForm from "./CardPopupForm";
import SmallActivityItem from "@/pages/Home/components/SmallActivityItem";

export default function EditCardForm({
  children,
  selector,
  task,
}: {
  children: React.ReactNode;
  selector?: string;
  task: Task;
}) {
  const { name, description, dueDate, priority } = task;

  const [isEditing, setIsEditing] = useState(false);

  const { id } = useList();

  const { todo, activity } = useSelector((state: RootState) => state);

  const taskLists = todo.taskLists;
  const taskActivities = activity.activityLog.filter(
    (activity) => task.id === activity.taskId
  );

  const list = useMemo(
    () => taskLists.find((list) => list.id === id),
    [taskLists, id]
  );

  return (
    <Dialog>
      <DialogTrigger className={selector}>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-7xl w-full min-h-[60vh] p-0 border-0 flex flex-col gap-0",
          selector
        )}
      >
        <div className="w-full h-10 bg-secondary relative -z-50 rounded-t-lg"></div>
        <div className="w-full grid grid-cols-[5fr,3fr] gap-8 flex-grow">
          {!isEditing && (
            <div className="w-full flex flex-col gap-8 flex-grow pl-8 pt-8">
              <div className="w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold">{name}</h1>
                <Button
                  variant={"outline"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit />
                  Edit task
                </Button>
              </div>

              <div className="w-1/2 flex flex-col gap-2">
                <div className="w-full flex">
                  <div className="w-1/2 flex gap-3 items-center text-accent-foreground stroke-accent-foreground h-10">
                    <Crosshair size={16} />
                    Status
                  </div>
                  <div className="w-1/2 font-semibold">{list?.name}</div>
                </div>

                <div className="w-full flex">
                  <div className="w-1/2 flex gap-3 items-center text-accent-foreground stroke-accent-foreground h-10">
                    <Calendar size={16} />
                    Due date
                  </div>
                  <div className="w-1/2 font-semibold">
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
                  <div className="w-1/2 capitalize font-semibold">
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
          )}

          {isEditing && (
            <EditCardPopupForm
              task={task}
              callback={() => setIsEditing(false)}
            />
          )}

          <div className="w-full bg-secondary/50 pl-8 pt-8  ">
            <h3 className="text-xl font-bold h-10 flex items-center">
              Activity
            </h3>
            <ul className="flex flex-col gap-2 pr-4 overflow-y-auto max-h-[52vh]">
              {taskActivities.map((activity) => (
                <SmallActivityItem key={activity.id} activity={activity} />
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
