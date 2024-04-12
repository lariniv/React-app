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
import { formSchema } from "./schemas/form-schema";
import { useState } from "react";
import useOutsideClick from "@/shared/hooks/use-outside-hook";
import { AppDispatch } from "@/processes";
import { fetchAddBoard } from "@/entities";

export default function CreateBoardForm({
  children,
}: {
  children: React.ReactNode;
}) {
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
      dispatch(fetchAddBoard({ name, ownerId: token }));
    }

    setIsOpen(false);

    form.reset();
  }
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(".create-board-menu", () => setIsOpen(false));

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(!isOpen)}>
        {children}
      </DialogTrigger>
      <DialogContent
        customOnClick={() => setIsOpen(false)}
        className="max-md:h-screen max-md:flex max-md:flex-col create-board-menu"
      >
        <DialogHeader className="font-bold mx-auto text-2xl">
          Create new board!
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
                  <FormLabel>Board name</FormLabel>
                  <FormControl>
                    <Input placeholder="List name" {...field} />
                  </FormControl>
                  <FormDescription>Name for your board</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create board</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
