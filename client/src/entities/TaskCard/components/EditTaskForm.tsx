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

import { useDispatch } from "react-redux";
import {
  Task,
  TaskDto,
  editTask,
} from "@/app/store/todo-slice/todo-lists-slice";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useList } from "@/app/list-provider/list-provider";

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Name is required" }),
  priority: z.string(),
});

export default function EditCardForm({
  children,
  selector,
  task,
}: {
  children: React.ReactNode;
  selector?: string;
  task: Task;
}) {
  const dispatch = useDispatch();

  const { id: taskId, name, description } = task;

  const { id: listId } = useList();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      description,
      priority: "",
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    const name = value.name;
    const description = value.description;
    const priority = value.priority;

    let task = {} as Partial<TaskDto>;

    if (name) {
      task.name = name;
    }

    if (description) {
      task.description = description;
    }

    if (priority) {
      task.priority = priority as "low" | "medium" | "high";
    }

    if (Object.keys(task).length === 0) return;

    dispatch(editTask({ listId, taskId, task }));

    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger className={selector}>{children}</DialogTrigger>
      <DialogContent className={selector}>
        <DialogHeader className="font-bold mx-auto text-2xl">
          Edit your task!
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
                  <FormLabel>New task name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>Set your desired name</FormDescription>
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
                  <FormDescription>
                    Set your desired description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New priority</FormLabel>
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
