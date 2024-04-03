import { ListProvider } from "@/app/list-provider/list-provider";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { TaskList } from "../../../widgets";

export default function TaskBoard() {
  const taskLists = useSelector((state: RootState) => state.todo.taskLists);

  return (
    <div
      className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 md:gap-6`}
    >
      {taskLists &&
        taskLists.map((list) => (
          <ListProvider value={list} key={list.id}>
            <TaskList
              title={list.name}
              totalTaskAmount={list.tasks.length}
              taskArray={list.tasks}
            />
          </ListProvider>
        ))}
    </div>
  );
}
