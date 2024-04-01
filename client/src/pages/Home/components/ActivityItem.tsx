import { Activity } from "@/app/store/activity-slice/activity-slice";
import { RootState } from "@/app/store/store";
import { TaskListType } from "@/app/store/todo-slice/types/task-list-type";
import { useSelector } from "react-redux";

export default function ActivityItem({ activity }: { activity: Activity }) {
  const taskLists = useSelector((state: RootState) => state.todo.taskLists);

  function ParseAction() {
    let targetList: TaskListType | undefined;

    if (activity.type === "REMOVE") {
      targetList = taskLists.find((list) => list.id === activity.targetList);
    }

    switch (activity.type) {
      case "MOVE":
        return (
          <div>
            You moved <b>{activity.taskName}</b> from{" "}
            <b>{activity.sourceList}</b> to <b>{activity.targetList}</b>
          </div>
        );
      case "ADD":
        return (
          <div>
            You added <b>{activity.taskName}</b> to the{" "}
            <b>{activity.listName}</b>
          </div>
        );
      case "REMOVE":
        return (
          <div>
            You removed <b>{activity.taskName}</b>{" "}
            {targetList?.name && (
              <>
                from <b>{targetList?.name}</b>
              </>
            )}
          </div>
        );
      case "EDIT":
        return (
          <div>
            You changed the{" "}
            {String(activity.edittedField) === "dueDate"
              ? "due date"
              : String(activity.edittedField)}{" "}
            <b>{activity.taskName}</b> from{" "}
            <b>
              {activity.edittedField === "dueDate" &&
                new Date(activity.initialValue).toLocaleDateString()}
              {activity.edittedField === "priority" &&
                String(activity.initialValue).slice(0, 1).toUpperCase() +
                  String(activity.initialValue).slice(1).toLowerCase()}
              {activity.edittedField !== "dueDate" &&
                activity.edittedField !== "priority" &&
                String(activity.initialValue)}
            </b>{" "}
            to{" "}
            <b>
              {activity.edittedField === "dueDate" &&
                new Date(activity.changedValue).toLocaleDateString()}
              {activity.edittedField === "priority" &&
                String(activity.changedValue).slice(0, 1).toUpperCase() +
                  String(activity.changedValue).slice(1).toLowerCase()}
              {activity.edittedField !== "dueDate" &&
                activity.edittedField !== "priority" &&
                String(activity.changedValue)}
            </b>
          </div>
        );
      case "RENAME":
        return (
          <div>
            You renamed <b>{activity.initialValue}</b> to{" "}
            <b>{activity.changedValue}</b>
          </div>
        );
    }
  }

  return (
    <div className="w-full clear-start flex flex-col items-start gap-2">
      <div className="text-start grid grid-cols-[12px,1fr] items-center gap-4 text-sm">
        <div className="rounded-full mx-auto w-1.5 h-1.5 bg-black/50" />
        {ParseAction()}
      </div>
      <i className="pl-7 text-sm">
        {new Date(activity.date).toLocaleDateString("en-UA", {
          day: "numeric",
          month: "long",
        })}{" "}
        at {new Date(activity.date).getHours()}:
        {new Date(activity.date).getMinutes() > 10
          ? `${new Date(activity.date).getMinutes()}`
          : `0${new Date(activity.date).getMinutes()}`}
      </i>
    </div>
  );
}
