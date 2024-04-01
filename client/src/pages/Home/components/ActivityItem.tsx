import { Activity } from "@/app/store/activity-slice/activity-slice";

export default function ActivityItem({ activity }: { activity: Activity }) {
  function ParseAction() {
    switch (activity.type) {
      case "move":
        return (
          <div>
            You moved <b>{activity.taskName}</b> from{" "}
            <b>{activity.sourcelList}</b> to <b>{activity.targetList}</b>
          </div>
        );
      case "add":
        return (
          <div>
            You added <b>{activity.taskName}</b> to the{" "}
            <b>{activity.listName}</b>
          </div>
        );
      case "remove":
        return (
          <div>
            You removed <b>{activity.taskName}</b> from{" "}
            <b>{activity.targetList}</b>
          </div>
        );
      case "edit":
        return (
          <div>
            You changed the{" "}
            {activity.edittedField instanceof Date
              ? "due date"
              : activity.edittedField}{" "}
            <b>{activity.taskName}</b> from{" "}
            <b>
              {activity.inititalValue instanceof Date
                ? activity.inititalValue.toLocaleDateString()
                : activity.inititalValue}
            </b>{" "}
            to <b>{activity.changedValue}</b>
          </div>
        );
      case "rename":
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
        {activity.date.toLocaleDateString("en-UA", {
          day: "numeric",
          month: "long",
        })}{" "}
        at {activity.date.getHours()}:
        {activity.date.getMinutes() > 10
          ? `${activity.date.getMinutes()}`
          : `0${activity.date.getMinutes()}`}
      </i>
    </div>
  );
}
