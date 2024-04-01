import { AppDispatch, RootState } from "@/app/store/store";
import { Task } from "@/app/store/todo-slice/todo-lists-slice";
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
import TaskCardMenu from "./components/TaskCardMenu";
import { useList } from "@/app/list-provider/list-provider";
import { addMoveActivity } from "@/app/store/activity-slice/activity-slice";
import { fetchUpdateTodo } from "@/app/store/todo-slice/thunks/fetch-update-todo";

export default function TaskCard({
  name,
  description,
  dueDate,
  priority,
  id,
}: Task) {
  const { id: listId } = useList();
  const dispatch = useDispatch<AppDispatch>();
  const taskLists = useSelector((state: RootState) => state.todo.taskLists);
  const { name: listName } = taskLists.find((list) => list.id === listId)!;
  return (
    <Card className="w-full text-start">
      <CardHeader>
        <CardTitle className="flex items-center justify-between w-full">
          <span className="max-w-[90%] overflow-clip">{name}</span>
          <TaskCardMenu task={{ name, description, dueDate, priority, id }} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div>{description}</div>
          <div className="flex items-center gap-1">
            <Calendar size={18} />
            <p>
              {dueDate.toLocaleDateString("en-UA", {
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
                  priority === "low" ? "bg-black/25" : ""
                } ${priority === "medium" ? "bg-black/50" : ""} ${
                  priority === "high" ? "bg-black/85" : ""
                } rounded-full`}
              />
              <div className="font-semibold text-black/80 capitalize">
                {priority}
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
          <DropdownMenuContent className="w-60">
            {taskLists.map((list) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={list.id}
                onClick={() => {
                  if (list.id === listId) return;

                  dispatch(fetchUpdateTodo({ id, data: { List: list.id } }));

                  dispatch(
                    addMoveActivity({
                      taskId: id,
                      targetList: list.name,
                      sourcelList: listName,
                      type: "move",
                      taskName: name,
                    })
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
