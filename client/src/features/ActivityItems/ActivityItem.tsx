import { RootState, useBoard } from "@/processes";
import { Activity, TaskList } from "@/entities";
import { useSelector } from "react-redux";
import {
  getAssembledTime,
  getChangedValue,
  getFieldName,
  getInitialValue,
  getLocalTime,
} from "./helpers";

export default function ActivityItem({ activity }: { activity: Activity }) {
  const { id: boardId } = useBoard();

  const boardLists = useSelector((state: RootState) => state.board.taskBoards);

  const board = boardLists.find((board) => board.id === boardId);

  const taskLists = board?.lists;

  function ParseAction() {
    let targetList: TaskList | undefined;

    if (activity.type === "REMOVE" && taskLists) {
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
            You changed the {getFieldName(activity.edittedField)}{" "}
            <b>{activity.taskName}</b> from{" "}
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
        {getLocalTime(new Date(activity.date))} at{" "}
        {getAssembledTime(new Date(activity.date))}
      </i>
    </div>
  );
}
