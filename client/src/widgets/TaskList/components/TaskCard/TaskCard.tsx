import { AppDispatch, RootState } from "@/app/store/store";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Calendar, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useList } from "@/app/list-provider/list-provider";
import { moveTodo } from "@/app/store/todo-slice/todo-lists-slice";
import {
  MoveActivity,
  Task,
  fetchAddActivity,
  fetchUpdateTodo,
  priority,
} from "@/entities";
import { TaskCardMenu } from "@/features";

export default function TaskCard({
  name,
  description,
  dueDate,
  priority: priorityValue,
  id: taskId,
}: Task) {
  const dispatch = useDispatch<AppDispatch>();

  const taskLists = useSelector((state: RootState) => state.todo.taskLists);

  const { id: listId } = useList();

  const { name: listName } = taskLists.find((list) => list.id === listId)!;
  return (
    <Card className="w-full text-start">
      <CardHeader>
        <CardTitle className="flex items-center justify-between w-full">
          <span className="max-w-[90%] overflow-clip">{name}</span>
          <TaskCardMenu
            task={{
              name,
              description,
              dueDate,
              priority: priorityValue,
              id: taskId,
            }}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div>{description}</div>
          <div className="flex items-center gap-1">
            <Calendar size={18} />
            <p>
              {new Date(dueDate).toLocaleDateString("en-UA", {
                weekday: "short",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>

          <div className="py-2">
            <div className="grid grid-cols-[6px_1fr] items-center gap-2 rounded-lg bg-black/10 w-fit px-4">
              <div
                className={`w-full aspect-square ${
                  priorityValue ? "" : "bg-black/25"
                } ${priorityValue === priority.low ? "bg-black/25" : ""} ${
                  priorityValue === priority.medium ? "bg-black/50" : ""
                } ${
                  priorityValue === priority.high ? "bg-black/85" : ""
                } rounded-full`}
              />
              <div className="font-semibold text-black/80 capitalize">
                {priorityValue.toLowerCase()}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="justify-between w-full">
              Move to:
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:w-60 w-[26.5rem]">
            {taskLists.map((list) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={list.id}
                onClick={() => {
                  if (list.id === listId) return;

                  dispatch(
                    fetchUpdateTodo({ id: taskId, data: { listId: list.id } })
                  );

                  dispatch(
                    moveTodo({
                      taskId,
                      targetListId: list.id,
                      sourceListId: listId,
                    })
                  );

                  const activityPayload: MoveActivity = {
                    date: new Date(),
                    taskId: taskId,
                    targetList: list.name,
                    sourceList: listName,
                    type: "MOVE",
                    taskName: name,
                  };

                  console.log("taskid", activityPayload);
                  const ownerId = localStorage.getItem("token")!;

                  if (!ownerId) return;

                  dispatch(
                    fetchAddActivity({ activityData: activityPayload, ownerId })
                  );
                }}
              >
                <div>{list.name}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
