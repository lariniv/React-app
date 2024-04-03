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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";
import { AppDispatch } from "@/app/store/store";
import {
  EditActivity,
  RenameActivity,
  Task,
  TaskDto,
  fetchAddActivity,
  fetchUpdateTodo,
  priority,
} from "@/entities";
import { formSchema } from "./schemas/form-schema";
import { cn } from "@/shared/lib/utils";

export default function EditCardForm({
  children,
  selector,
  task,
}: {
  children: React.ReactNode;
  selector?: string;
  task: Task;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    id: taskId,
    name: taskName,
    description: taskDescription,
    priority: taskPriority,
    dueDate: taskDueDate,
  } = task;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: taskName,
      description: taskDescription,
      dueDate: new Date(taskDueDate).toISOString().split("T")[0],
      priority: "low",
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    const name = value.name;
    const description = value.description;
    let priorityValue = value.priority;
    const dueDate = value.dueDate;

    if (priorityValue === "low") priorityValue = priority.low;
    if (priorityValue === "medium") priorityValue = priority.medium;
    if (priorityValue === "high") priorityValue = priority.high;

    const task = {} as Partial<TaskDto>;

    const ownerId = localStorage.getItem("token");
    if (!ownerId) return;

    if (name && name !== taskName) {
      task.name = name;

      const renameActivityPayload: RenameActivity = {
        taskId,
        date: new Date(),
        taskName,
        initialValue: taskName,
        changedValue: name,
        type: "RENAME",
      };

      dispatch(
        fetchAddActivity({ activityData: renameActivityPayload, ownerId })
      );
    }

    if (description && description !== taskDescription) {
      task.description = description;

      const editActivityPayload: EditActivity = {
        taskId,
        taskName,
        date: new Date(),
        edittedField: "description",
        initialValue: taskDescription,
        changedValue: description,
        type: "EDIT",
      };

      dispatch(
        fetchAddActivity({ activityData: editActivityPayload, ownerId })
      );
    }

    if (
      dueDate &&
      new Date(dueDate).getTime() !== new Date(taskDueDate).getTime()
    ) {
      task.dueDate = new Date(dueDate);

      const editActivityPayload: EditActivity = {
        taskId,
        taskName,
        date: new Date(),
        edittedField: "dueDate",
        initialValue: taskDueDate,
        changedValue: dueDate,
        type: "EDIT",
      };

      dispatch(
        fetchAddActivity({ activityData: editActivityPayload, ownerId })
      );
    }

    if (priorityValue && priorityValue !== taskPriority) {
      task.priority = priorityValue as priority;

      const editActivityPayload: EditActivity = {
        taskId,
        taskName,
        date: new Date(),
        edittedField: "priority",
        initialValue: taskPriority,
        changedValue: priorityValue,
        type: "EDIT",
      };

      dispatch(
        fetchAddActivity({ activityData: editActivityPayload, ownerId })
      );
    }

    if (Object.keys(task).length === 0) return;

    dispatch(fetchUpdateTodo({ id: taskId, data: { ...task } }));

    setIsOpen(false);

    form.reset();
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger className={selector} onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent
        customOnClick={() => setIsOpen(false)}
        className={cn("max-md:h-screen max-md:flex max-md:flex-col", selector)}
      >
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
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>Set your desired due date</FormDescription>
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
                    >
                      <option
                        disabled
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      >
                        Select priority
                      </option>
                      <option
                        className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        value="low"
                      >
                        Low
                      </option>
                      <option
                        className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        value="medium"
                      >
                        Medium
                      </option>
                      <option
                        className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
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

            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
