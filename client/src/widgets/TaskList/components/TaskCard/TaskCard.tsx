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
import {
  MoveActivity,
  Task,
  fetchAddActivity,
  fetchUpdateTodo,
} from "@/entities";
import { TaskCardMenu } from "@/features";
import { AppDispatch, RootState, useBoard, useList } from "@/processes";
import { moveTodo } from "@/processes/store/board-slice/board-slice";

export default function TaskCard({
  name,
  description,
  dueDate,
  priority: priorityValue,
  id: taskId,
}: Task) {
  const dispatch = useDispatch<AppDispatch>();

  const { id: boardId } = useBoard();

  const { id: listId } = useList();

  const taskBoards = useSelector((state: RootState) => state.board.taskBoards);

  const board = taskBoards.find((board) => board.id === boardId);

  const taskLists = board?.lists;

  const list = taskLists && taskLists.find((list) => list.id === listId);

  const listName = list?.name ?? "";

  function getPriorityColor(priority: string) {
    switch (priority) {
      case "LOW":
        return "bg-black/25";
      case "MEDIUM":
        return "bg-black/50";
      case "HIGH":
        return "bg-black/85";
      default:
        return "bg-black/25";
    }
  }
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
                className={`w-full aspect-square ${getPriorityColor(
                  priorityValue
                )} rounded-full`}
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
            {taskLists &&
              taskLists.map((list) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  key={list.id}
                  onClick={() => {
                    if (list.id === listId) return;

                    dispatch(
                      fetchUpdateTodo({
                        id: taskId,
                        data: { listId: list.id },
                        boardId,
                      })
                    );

                    dispatch(
                      moveTodo({
                        taskId,
                        boardId,
                        targetListId: list.id,
                        sourceListId: listId,
                      })
                    );

                    const activityPayload: MoveActivity = {
                      date: new Date(),
                      taskId: taskId,
                      boardId,
                      targetList: list.name,
                      sourceList: listName,
                      type: "MOVE",
                      taskName: name,
                    };

                    const ownerId = localStorage.getItem("token")!;

                    if (!ownerId) return;

                    dispatch(
                      fetchAddActivity({
                        activityData: activityPayload,
                        ownerId,
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
