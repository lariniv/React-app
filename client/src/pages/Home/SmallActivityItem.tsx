import { Activity } from "@/app/store/activity-slice/activity-slice";

export default function ActivityItem({ activity }: { activity: Activity }) {
  function ParseAction() {
    switch (activity.type) {
      case "move":
        return (
          <div>
            You moved this task from <b>{activity.sourcelList}</b> to{" "}
            <b>{activity.targetList}</b>
          </div>
        );
      case "add":
        return <div>You created this task</div>;
      case "edit":
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
      case "rename":
        return (
          <div>
            You renamed this task from <b>{activity.initialValue}</b> to{" "}
            <b>{activity.changedValue}</b>
          </div>
        );
    }
  }

  return (
    <li className="w-full gap-2 text-xs grid grid-cols-[2fr,1fr]">
      <div className="text-start grid grid-cols-[8px,1fr] items-center gap-4">
        <div className="rounded-full mx-auto w-1 h-1 bg-black/50" />
        {ParseAction()}
      </div>
      <i className="pl-4">
        {activity.date.toLocaleDateString("en-UA", {
          day: "numeric",
          month: "long",
        })}{" "}
        at {activity.date.getHours()}:
        {activity.date.getMinutes() > 10
          ? `${activity.date.getMinutes()}`
          : `0${activity.date.getMinutes()}`}
      </i>
    </li>
  );
}
