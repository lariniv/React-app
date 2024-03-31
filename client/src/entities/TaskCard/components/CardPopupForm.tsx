import { Button } from "@/shared/components/ui/button";

import { Input } from "@/shared/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";

import { useDispatch, useSelector } from "react-redux";
import {
  Task,
  TaskDto,
  editTask,
  moveTask,
} from "@/app/store/todo-slice/todo-lists-slice";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useList } from "@/app/list-provider/list-provider";
import { Calendar, Crosshair, Edit, Tag } from "lucide-react";
import { RootState } from "@/app/store/store";
import { Textarea } from "@/shared/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Name is required" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  priority: z.string(),
});

export default function EditCardPopupForm({
  task,
  callback,
}: {
  task: Task;
  callback: () => void;
}) {
  const dispatch = useDispatch();

  const { id: taskId, name, description, dueDate, priority } = task;

  const { id: listId } = useList();

  const taskLists = useSelector((state: RootState) => state.taskLists);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      description,
      dueDate: dueDate.toISOString().split("T")[0],
      status: listId,
      priority,
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    const name = value.name;
    const description = value.description;
    const priority = value.priority;
    const dueDate = value.dueDate;
    const status = value.status;

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

    if (dueDate) {
      console.log(new Date(dueDate));
      task.dueDate = new Date(dueDate);
    }

    if (Object.keys(task).length === 0) return;

    dispatch(editTask({ listId, taskId, task }));

    if (status) {
      dispatch(
        moveTask({ sourceListId: listId, taskId, targetListId: status })
      );
    }

    callback();

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-8 flex-grow pl-8 pt-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full flex justify-between items-center mt-0">
                  <Input
                    defaultValue={name}
                    placeholder="Name"
                    className="w-1/2 text-3xl font-bold pl-0"
                    {...field}
                  />
                  <Button variant={"outline"} onClick={callback}>
                    <Edit />
                    Stop editing
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-1/2 flex flex-col gap-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full flex">
                    <div className="w-1/2 flex gap-3 items-center text-accent-foreground stroke-accent-foreground">
                      <Crosshair size={16} />
                      Status
                    </div>
                    <select
                      defaultValue={listId}
                      className="flex h-10 w-1/2  font-semibold items-center justify-between rounded-md border border-input bg-background px-3 py-0.5 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      {...field}
                    >
                      {taskLists.map((list) => (
                        <option
                          key={list.id}
                          className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          value={list.id}
                        >
                          {list.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full flex">
                    <div className="w-1/2 flex gap-3 items-center text-accent-foreground stroke-accent-foreground">
                      <Calendar size={16} />
                      Due date
                    </div>
                    <Input
                      className="w-1/2 font-semibold py-0.5 px-3.5"
                      type="date"
                      defaultValue={dueDate.toISOString().split("T")[0]}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full flex">
                    <div className="w-1/2 flex gap-3 items-center text-accent-foreground stroke-accent-foreground">
                      <Tag size={16} />
                      Priority
                    </div>
                    <select
                      {...field}
                      className="flex h-10 w-1/2  font-semibold items-center justify-between rounded-md border border-input bg-background px-3 py-0.5 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      defaultValue={priority}
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
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h2 className="text-xl font-bold">Desciption</h2>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full flex justify-between items-center">
              <FormControl>
                <Textarea
                  defaultValue={description}
                  className="resize-none w-1/2"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}
