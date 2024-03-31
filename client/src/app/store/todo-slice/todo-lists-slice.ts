import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
};

export type TaskDto = Omit<Task, "id">;

export type TaskListType = {
  id: string;
  name: string;
  tasks: Task[];
};

type TaskListState = {
  taskLists: TaskListType[];
};

const initialState: TaskListState = {
  taskLists: [
    {
      id: Math.round(Math.random() * 1000000000000).toString(),
      name: "To do",
      tasks: [
        {
          id: Math.round(Math.random() * 1000000000000).toString(),
          name: "Create a new project",
          description: "Create a new project for the client",
          dueDate: new Date(),
          priority: "low",
        },
        {
          id: Math.round(Math.random() * 1000000000000).toString(),
          name: "Create a new project",
          description: "Create a new project for the client",
          dueDate: new Date(),
          priority: "low",
        },
      ],
    },
    {
      id: Math.round(Math.random() * 1000000000000).toString(),
      name: "Planned",
      tasks: [],
    },
    {
      id: Math.round(Math.random() * 1000000000000).toString(),
      name: "In progress",
      tasks: [],
    },
    {
      id: Math.round(Math.random() * 1000000000000).toString(),
      name: "Closed",
      tasks: [],
    },
  ],
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addTaskList: (state, action: PayloadAction<{ name: string }>) => {
      state.taskLists.push({
        id: Date.now().toString(),
        name: action.payload.name,
        tasks: [],
      });
    },

    removeTaskList: (state, action: PayloadAction<{ listId: string }>) => {
      state.taskLists = state.taskLists.filter(
        (list) => list.id !== action.payload.listId
      );
    },

    editTaskList: (
      state,
      action: PayloadAction<{ listId: string; name: string }>
    ) => {
      const list = state.taskLists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        list.name = action.payload.name;
      }
    },

    addTask: (
      state,
      action: PayloadAction<{ listId: string; task: TaskDto }>
    ) => {
      const list = state.taskLists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        list.tasks.push({
          id: Date.now().toString(),
          ...action.payload.task,
        });
      }
    },

    removeTask: (
      state,
      action: PayloadAction<{ taskId: string; listId: string }>
    ) => {
      const list = state.taskLists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        list.tasks = list.tasks.filter(
          (task) => task.id !== action.payload.taskId
        );
      }
    },

    editTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        listId: string;
        task: Partial<TaskDto>;
      }>
    ) => {
      const { task } = action.payload;
      const { name, description, priority, dueDate } = task;

      console.log(name, description);

      const list = state.taskLists.find(
        (list) => list.id === action.payload.listId
      );

      if (list) {
        const task = list.tasks.find(
          (task) => task.id === action.payload.taskId
        );

        if (task) {
          if (name) {
            task.name = name;
          }
          if (description) {
            task.description = description;
          }
          if (priority) {
            task.priority = priority;
          }
          if (dueDate) {
            task.dueDate = dueDate;
          }
        }
      }
    },

    moveTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        sourceListId: string;
        targetListId: string;
      }>
    ) => {
      const { sourceListId, targetListId, taskId } = action.payload;

      if (sourceListId !== targetListId) {
        const sourceList = state.taskLists.find(
          (list) => list.id === sourceListId
        );

        const targetList = state.taskLists.find(
          (list) => list.id === targetListId
        );

        const task = sourceList?.tasks.find((task) => task.id === taskId);

        if (task && sourceList && targetList) {
          sourceList.tasks = sourceList.tasks.filter(
            (task) => task.id !== taskId
          );
          targetList.tasks.push(task);
        }
      }
    },
  },
});

export const {
  addTaskList,
  addTask,
  moveTask,
  editTask,
  editTaskList,
  removeTask,
  removeTaskList,
} = taskListSlice.actions;

export default taskListSlice.reducer;
