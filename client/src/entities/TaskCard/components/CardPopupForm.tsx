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
  priority,
} from "@/app/store/todo-slice/todo-lists-slice";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useList } from "@/app/list-provider/list-provider";
import { Calendar, Crosshair, Edit, Tag } from "lucide-react";
import { AppDispatch, RootState } from "@/app/store/store";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  addEditActivity,
  addMoveActivity,
  addRenameActivity,
} from "@/app/store/activity-slice/activity-slice";
import { fetchUpdateTodo } from "@/app/store/todo-slice/thunks/fetch-update-todo";

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
  const dispatch = useDispatch<AppDispatch>();

  const {
    id: taskId,
    name: taskName,
    description: taskDescription,
    dueDate: taskDueDate,
    priority: taskPriority,
  } = task;

  const { id: listId } = useList();

  const taskLists = useSelector((state: RootState) => state.todo.taskLists);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: taskName,
      description: taskDescription,
      dueDate: new Date(taskDueDate).toISOString().split("T")[0],
      status: listId,
      priority: taskPriority,
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    const name = value.name;
    const description = value.description;
    let priorityValue = value.priority;
    const dueDate = value.dueDate;
    const status = value.status;

    if (priorityValue === "low") priorityValue = priority.low;
    if (priorityValue === "medium") priorityValue = priority.medium;
    if (priorityValue === "high") priorityValue = priority.high;

    const task = {} as Partial<TaskDto>;

    if (name && name !== taskName) {
      task.name = name;
      dispatch(
        addRenameActivity({
          taskId,
          taskName,
          changedValue: name,
          initialValue: taskName,
          type: "rename",
        })
      );
    }

    if (description && description !== taskDescription) {
      task.description = description;
      dispatch(
        addEditActivity({
          taskId,
          taskName: taskName,
          edittedField: "description",
          type: "edit",
          inititalValue: taskDescription,
          changedValue: description,
        })
      );
    }

    if (priorityValue && priorityValue !== taskPriority) {
      task.priority = priorityValue as priority;
      dispatch(
        addEditActivity({
          taskId,
          taskName: taskName,
          edittedField: "priority",
          type: "edit",
          inititalValue: taskPriority,
          changedValue: priorityValue,
        })
      );
    }

    if (
      dueDate &&
      new Date(dueDate).getTime() !== new Date(taskDueDate).getTime()
    ) {
      task.dueDate = new Date(dueDate);

      dispatch(
        addEditActivity({
          taskId,
          taskName: taskName,
          edittedField: "dueDate",
          type: "edit",
          inititalValue: taskDueDate,
          changedValue: dueDate,
        })
      );
    }

    if (Object.keys(task).length === 0) return;

    dispatch(fetchUpdateTodo({ id: taskId, data: { ...task } }));

    if (status && status !== listId) {
      dispatch(fetchUpdateTodo({ id: taskId, data: { listId: status } }));

      dispatch(
        addMoveActivity({
          taskId,
          taskName,
          sourcelList: taskLists.find((list) => list.id === listId)
            ?.name as string,
          targetList: taskLists.find((list) => list.id === status)
            ?.name as string,
          type: "move",
        })
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
                    defaultValue={taskName}
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
                      defaultValue={
                        new Date(taskDueDate).toISOString().split("T")[0]
                      }
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
                      defaultValue={taskPriority}
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
                  defaultValue={taskDescription}
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
