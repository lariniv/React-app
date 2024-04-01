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
import { useList } from "@/app/list-provider/list-provider";
import { AppDispatch } from "@/app/store/store";
import { fetchUpdateTodoList } from "@/app/store/todo-slice/thunks";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export default function EditListForm({
  children,
  selector,
}: {
  children: React.ReactNode;
  selector?: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { id: listId, name } = useList();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    const name = value.name;

    dispatch(fetchUpdateTodoList({ id: listId, data: { name } }));

    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger className={selector}>{children}</DialogTrigger>
      <DialogContent className={selector}>
        <DialogHeader className="font-bold mx-auto text-2xl">
          Edit your list
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

            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
