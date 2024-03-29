import { RootState } from "@/app/store";
import { TaskList } from "@/features";
import { useSelector } from "react-redux";

export default function TaskBoard() {
  const taskLists = useSelector((state: RootState) => state.taskLists);
  return (
    <div className="w-full grid grid-cols-4 gap-12">
      {taskLists.map((list) => (
        <TaskList
          key={list.id}
          title={list.name}
          totalTaskAmount={list.tasks.length}
          taskArray={list.tasks}
        />
      ))}
    </div>
  );
}
