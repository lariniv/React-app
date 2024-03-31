import { ListProvider } from "@/app/list-provider/list-provider";
import { RootState } from "@/app/store/store";
import { TaskList } from "@/features";
import { useSelector } from "react-redux";

export default function TaskBoard() {
  const taskLists = useSelector((state: RootState) => state.taskLists);
  console.log(taskLists);
  return (
    <div className={`w-full grid grid-cols-4 gap-6`}>
      {taskLists.map((list) => (
        <ListProvider value={list}>
          <TaskList
            key={list.id}
            title={list.name}
            totalTaskAmount={list.tasks.length}
            taskArray={list.tasks}
          />
        </ListProvider>
      ))}
    </div>
  );
}
