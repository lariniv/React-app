import { Activity } from "@/entities";
import {
  getAssembledTime,
  getChangedValue,
  getFieldName,
  getInitialValue,
  getLocalTime,
} from "./helpers";

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
            You changed the {getFieldName(activity.edittedField)} from{" "}
            <b>
              {getInitialValue(activity.edittedField, activity.initialValue)}
            </b>{" "}
            to{" "}
            <b>
              {getChangedValue(activity.edittedField, activity.changedValue)}
            </b>
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
    <li className="w-full gap-2 text-xs grid grid-cols-1 sm:grid-cols-[2fr,1fr]">
      <div className="text-start grid grid-cols-[8px,1fr] items-center gap-4">
        <div className="rounded-full mx-auto w-1 h-1 bg-black/50" />
        {ParseAction()}
      </div>
      <i className="flex items-start justify-start max-sm:pl-6 sm:justify-end">
        {getLocalTime(new Date(activity.date))} at{" "}
        {getAssembledTime(new Date(activity.date))}
      </i>
    </li>
  );
}
