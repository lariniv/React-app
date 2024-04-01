import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type BaseActivity = {
  id: string;
  date: Date;
  taskId: string;
  taskName: string;
};

export type MoveActivity = BaseActivity & {
  sourcelList: string;
  targetList: string;
  type: "move";
};

export type AddActivity = BaseActivity & {
  listName: string;
  type: "add";
};

export type RenameActivity = BaseActivity & {
  initialValue: string;
  changedValue: string;
  type: "rename";
};

export type RemoveActivity = BaseActivity & {
  targetList: string;
  type: "remove";
};

export type EditActivity = BaseActivity & {
  edittedField: string | Date;
  inititalValue: string | Date;
  changedValue: string;
  type: "edit";
};

export type Activity =
  | MoveActivity
  | AddActivity
  | RemoveActivity
  | EditActivity
  | RenameActivity;

type ActivityState = {
  activityLog: Activity[];
};

const initialState: ActivityState = {
  activityLog: [],
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addMoveActivity: (
      state,
      action: PayloadAction<Omit<MoveActivity, "id" | "date">>
    ) => {
      const data = {
        ...action.payload,
        date: new Date(),
        id: Date.now().toString(),
      };

      state.activityLog.push(data);
    },

    addAddActivity: (
      state,
      action: PayloadAction<Omit<AddActivity, "id" | "date">>
    ) => {
      const data = {
        ...action.payload,
        date: new Date(),
        id: Date.now().toString(),
      };

      state.activityLog.push(data);
    },

    addRemoveActivity: (
      state,
      action: PayloadAction<Omit<RemoveActivity, "id" | "date">>
    ) => {
      const data = {
        ...action.payload,
        date: new Date(),
        id: Date.now().toString(),
      };

      state.activityLog.push(data);
    },

    addEditActivity: (
      state,
      action: PayloadAction<Omit<EditActivity, "id" | "date">>
    ) => {
      const data = {
        ...action.payload,
        date: new Date(),
        id: Date.now().toString(),
      };

      state.activityLog.push(data);
    },

    addRenameActivity: (
      state,
      action: PayloadAction<Omit<RenameActivity, "id" | "date">>
    ) => {
      const data = {
        ...action.payload,
        date: new Date(),
        id: Date.now().toString(),
      };

      state.activityLog.push(data);
    },
  },
});

export const {
  addAddActivity,
  addEditActivity,
  addMoveActivity,
  addRemoveActivity,
  addRenameActivity,
} = activitySlice.actions;

export default activitySlice.reducer;
