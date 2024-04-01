import { Activity } from "@/app/store/activity-slice/activity-slice";

export default function ActivityItem({ activity }: { activity: Activity }) {
  function ParseAction() {
    switch (activity.type) {
      case "MOVE":
        return (
          <div>
            You moved this task from <b>{activity.sourceList}</b> to{" "}
            <b>{activity.targetList}</b>
          </div>
        );
      case "ADD":
        return <div>You created this task</div>;
      case "EDIT":
        return (
          <div>
            You changed{" "}
            {activity.edittedField instanceof Date
              ? "due date"
              : activity.edittedField}{" "}
            in this card from{" "}
            <b>
              {activity.initialValue instanceof Date
                ? new Date(activity.initialValue).toLocaleDateString()
                : activity.initialValue}
            </b>{" "}
            to <b>{activity.changedValue}</b>
          </div>
        );
      case "RENAME":
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
        {new Date(activity.date).toLocaleDateString("en-UA", {
          day: "numeric",
          month: "long",
        })}{" "}
        at {new Date(activity.date).getHours()}:
        {new Date(activity.date).getMinutes() > 10
          ? `${new Date(activity.date).getMinutes()}`
          : `0${new Date(activity.date).getMinutes()}`}
      </i>
    </li>
  );
}
