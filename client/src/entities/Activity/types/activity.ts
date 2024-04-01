export type BaseActivity = {
  id?: string;
  date: Date;
  taskId: string;
  taskName: string;
};

export type MoveActivity = BaseActivity & {
  sourceList: string;
  targetList: string;
  type: "MOVE";
};

export type AddActivity = BaseActivity & {
  listName: string;
  type: "ADD";
};

export type RenameActivity = BaseActivity & {
  initialValue: string;
  changedValue: string;
  type: "RENAME";
};

export type RemoveActivity = BaseActivity & {
  targetList: string;
  type: "REMOVE";
};

export type EditActivity = BaseActivity & {
  edittedField: string | Date;
  initialValue: string | Date;
  changedValue: string;
  type: "EDIT";
};

export type Activity =
  | MoveActivity
  | AddActivity
  | RemoveActivity
  | EditActivity
  | RenameActivity;
