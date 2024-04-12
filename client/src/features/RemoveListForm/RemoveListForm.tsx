import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useDispatch } from "react-redux";

import { useState } from "react";
import { fetchDeleteTodoList } from "@/entities";
import { AppDispatch, useList } from "@/processes";

export default function RemoveListForm({
  children,
  selector,
}: {
  children: React.ReactNode;
  selector?: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { id: listId } = useList();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        className={selector}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent
        className={selector}
        customOnClick={() => setIsOpen(false)}
      >
        <DialogHeader className="font-bold mx-auto text-2xl">
          Are you sure? This is irreversible!
        </DialogHeader>
        <div className="flex gap-1">
          <Button
            className="w-1/2"
            onClick={() => {
              dispatch(fetchDeleteTodoList({ id: listId }));

              setIsOpen(false);
            }}
          >
            Yes
          </Button>
          <Button
            className="w-1/2"
            variant={"outline"}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
