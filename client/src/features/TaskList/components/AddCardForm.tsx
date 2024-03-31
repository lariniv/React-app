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
import { Task, addTask } from "@/app/store/todo-slice/todo-lists-slice";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useList } from "@/app/list-provider/list-provider";
import { addAddActivity } from "@/app/store/activity-slice/activity-slice";
import { RootState } from "@/app/store/store";

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Name is required" }),
  priority: z.string(),
});

export default function AddCardForm({
  children,
  selector,
}: {
  children: React.ReactNode;
  selector?: string;
}) {
  const dispatch = useDispatch();

  const { id: listId } = useList();

  const taskLists = useSelector((state: RootState) => state.todo.taskLists);

  const list = taskLists.find((list) => list.id === listId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "",
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    const name = value.name;
    const description = value.description;
    const id = new Date().toString();
    const dueDate = new Date();
    let priority = value.priority as "low" | "medium" | "high";

    if (priority !== "low" && priority !== "medium" && priority !== "high") {
      priority = "low";
    }

    const task: Task = { name, description, priority, id, dueDate };

    dispatch(addTask({ listId, task }));

    dispatch(
      addAddActivity({
        listName: list?.name as string,
        type: "add",
        taskId: id,
        taskName: name,
      })
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
