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

    addTask: (state, action: PayloadAction<{ listId: string; task: Task }>) => {
      const list = state.taskLists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        list.tasks.push({
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
  extraReducers: (builder) => {
    builder.addCase(fetchAddTodo.fulfilled, (state, action) => {
      const { id, name, description, dueDate, listId, priority } =
        action.payload;
      console.log("action.payload", id);
      const task: Task = {
        id,
        name,
        description,
        dueDate,
        priority,
      };

      const list = state.taskLists.find((list) => list.id === listId);

      if (list) {
        list.tasks.push(task);
      }
    });

    builder.addCase(fetchAddTodoList.fulfilled, (state, action) => {
      state.taskLists.push({
        id: action.payload.id,
        name: action.payload.name,
        tasks: [],
      });
    });

    builder.addCase(fetchDeleteTodo.fulfilled, (state, action) => {
      const { id, listId } = action.payload;
      const list = state.taskLists.find((list) => list.id === listId);
      if (list) {
        list.tasks = list.tasks.filter((task) => task.id !== id);
      }
    });

    builder.addCase(fetchDeleteTodoList.fulfilled, (state, action) => {
      state.taskLists = state.taskLists.filter(
        (list) => list.id !== action.payload.id
      );
    });

    builder.addCase(
      fetchGetAllTodoListsByOwnerId.fulfilled,
      (state, action) => {
        state.taskLists = action.payload;
      }
    );

    builder.addCase(fetchUpdateTodo.fulfilled, (state, action) => {
      const { id, name, description, dueDate, listId, priority } =
        action.payload;

      const task: Task = {
        id,
        name,
        description,
        dueDate,
        priority,
      };

      const list = state.taskLists.find((list) => list.id === listId);
      if (list) {
        const taskIndex = list.tasks.findIndex((task) => task.id === id);
        list.tasks[taskIndex] = task;
      }
    });

    builder.addCase(fetchUpdateTodoList.fulfilled, (state, action) => {
      const { id, name } = action.payload;
      const list = state.taskLists.find((list) => list.id === id);
      if (list) {
        list.name = name;
      }
    });
  },
});

export const { moveTodo } = taskListSlice.actions;
export default taskListSlice.reducer;
