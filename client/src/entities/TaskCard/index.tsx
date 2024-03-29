import { Task } from "@/app/todo-lists-slice";
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
import { Calendar, ChevronDown, EllipsisVertical } from "lucide-react";

export default function TaskCard({
  name,
  description,
  dueDate,
  priority,
}: Task) {
  return (
    <Card className="w-full text-start">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {name}
          <EllipsisVertical size={20} className="cursor-pointer" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div>{description}</div>
          <div className="flex items-center gap-1">
            <Calendar size={18} />
            <p>{dueDate}</p>
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
            <DropdownMenuItem>
              <div>To do</div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div>Planned</div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div>In progress</div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div>Closed</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
