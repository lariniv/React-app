import CreateListForm from "./CreateListForm";
import { TaskBoard } from "@/widgets";
import HistorySidebar from "./HistorySidebar";

export default function Home() {
  return (
    <div className="relative max-w-7xl flex flex-col gap-8">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl text-start w-full font-bold">My task board</h1>
        <div className="flex gap-2">
          <HistorySidebar />
          <CreateListForm />
        </div>
      </div>

      <TaskBoard />
    </div>
  );
}
