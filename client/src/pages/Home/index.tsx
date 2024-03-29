import { Button } from "@/shared/components/ui/button";
import TaskBoard from "@/widgets/TaskBoard";

import { History } from "lucide-react";
import CreateListForm from "./CreateListForm";

export default function Home() {
  return (
    <div className="relative max-w-7xl flex flex-col gap-8">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl text-start w-full font-bold">My task board</h1>
        <div className="flex justify-end gap-2 w-full">
          <Button variant={"outline"}>
            <History size={18} />
            <div>History</div>
          </Button>
        </div>

        <CreateListForm />
      </div>

      <TaskBoard />
    </div>
  );
}
