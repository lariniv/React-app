import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

import { useDispatch, useSelector } from "react-redux";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useList } from "@/app/list-provider/list-provider";
import { AddActivity } from "@/app/store/activity-slice/activity-slice";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchAddTodo } from "@/app/store/todo-slice/thunks/fetch-add-todo";
import { priority } from "@/app/store/todo-slice/types/priority-enum";
import { TaskDto } from "@/app/store/todo-slice/types/task-dto";
import { fetchAddActivity } from "@/app/store/activity-slice/thunks/fetch-add-activity";

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Name is required" }),
  priority: z.string(),
  dueDate: z.string(),
});

export default function AddCardForm({
  children,
  selector,
}: {
  children: React.ReactNode;
  selector?: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { id: listId } = useList();

  const taskLists = useSelector((state: RootState) => state.todo.taskLists);

  const list = taskLists.find((list) => list.id === listId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "",
      dueDate: "",
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    const name = value.name;
    const description = value.description;
    const dueDate = new Date(value.dueDate);
    let priorityValue = value.priority;

    if (priorityValue === "low") {
      priorityValue = priority.low;
    } else if (priorityValue === "medium") {
      priorityValue = priority.medium;
    } else if (priorityValue === "high") {
      priorityValue = priority.high;
    }

    const ownerId = localStorage.getItem("token");
    if (!ownerId) return;

    const task: TaskDto = {
      name,
      description,
      priority: priorityValue as priority,
      dueDate,
      listId,
    };

    dispatch(fetchAddTodo({ taskData: task }));

    const addActivityPayload: AddActivity = {
      date: new Date(),
      taskId: listId,
      taskName: name,
      listName: list?.name as string,
      type: "ADD",
    };

    dispatch(
      fetchAddActivity({ activityData: addActivityPayload, ownerId, listId })
    );

    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger className={selector}>{children}</DialogTrigger>
      <DialogContent className={selector}>
        <DialogHeader className="font-bold mx-auto text-2xl">
          Add new Card!
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-6 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription>Name for your task</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormDescription>Describe your task</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="dueDate" {...field} />
                  </FormControl>
                  <FormDescription>Set due date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List name</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      defaultValue={"low"}
                    >
                      <option
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        value="low"
                      >
                        Low
                      </option>
                      <option
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        value="medium"
                      >
                        Medium
                      </option>
                      <option
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        value="high"
                      >
                        High
                      </option>
                    </select>
                  </FormControl>
                  <FormDescription>Set priority for your task</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create card</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
