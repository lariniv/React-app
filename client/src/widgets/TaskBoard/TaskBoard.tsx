import { HistorySidebar, TaskList } from "..";
import { CreateListForm } from "@/features";
import EditBoardForm from "@/features/EditBoardForm/EditBoardForm";
import { ListProvider, useBoard } from "@/processes";

export default function TaskBoard() {
  const board = useBoard();

  return (
    <div className="relative max-w-7xl w-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row w-full gap-4">
        <h1 className="text-4xl text-center md:text-3xl md:text-start w-full font-bold flex items-center gap-2 md:justify-start justify-center">
          {board.name}
          <EditBoardForm />
        </h1>
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:flex gap-2 w-full">
          <HistorySidebar />
          <CreateListForm />
        </div>
      </div>

      <div
        className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 md:gap-6`}
      >
        {board.lists &&
          board.lists.map((list) => (
            <ListProvider value={list} key={list.id}>
              <TaskList
                title={list.name}
                totalTaskAmount={list.tasks ? list.tasks.length : 0}
                taskArray={list.tasks}
              />
            </ListProvider>
          ))}
      </div>
    </div>
  );
}
