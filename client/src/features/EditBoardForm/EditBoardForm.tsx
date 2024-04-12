import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { AppDispatch, useBoard } from "@/processes";
import { fetchUpdateBoard } from "@/entities";
import { Edit } from "lucide-react";

export default function EditBoardForm() {
  const dispatch = useDispatch<AppDispatch>();

  const { id: boardId, name } = useBoard();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    const name = value.name;

    dispatch(fetchUpdateBoard({ data: { name }, boardId }));

    setIsOpen(false);

    form.reset();
  }
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(".edit-board-menu", () => setIsOpen(false));

  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="w-full edit-board-menu p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent
        customOnClick={() => setIsOpen(false)}
        className="max-md:h-screen max-md:flex max-md:flex-col edit-board-menu"
      >
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
                    <Input placeholder="Board name" {...field} />
                  </FormControl>
                  <FormDescription>New name for your board</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
