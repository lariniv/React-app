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

import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AppDispatch } from "@/app/store/store";
import { fetchAddTodoList } from "@/entities/Task/thunks";
import { formSchema } from "./schemas/form-schema";
import { useState } from "react";
import useOutsideClick from "@/shared/hooks/use-outside-hook";

export default function CreateListForm() {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    const name = value.name;

    const token = localStorage.getItem("token") as string;

    if (token) {
      dispatch(fetchAddTodoList({ name, ownerId: token }));
    }

    setIsOpen(false);

    form.reset();
  }
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(".create-list-menu", () => setIsOpen(false));

  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <Button
          className="w-full create-list-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus />
          <div>Create new list</div>
        </Button>
      </DialogTrigger>
      <DialogContent
        customOnClick={() => setIsOpen(false)}
        className="max-md:h-screen max-md:flex max-md:flex-col create-list-menu"
      >
        <DialogHeader className="font-bold mx-auto text-2xl">
          Create new list!
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
                  <FormLabel>List name</FormLabel>
                  <FormControl>
                    <Input placeholder="List name" {...field} />
                  </FormControl>
                  <FormDescription>Name for your list</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create list</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
