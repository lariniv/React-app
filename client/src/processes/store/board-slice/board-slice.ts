import {
  Task,
  fetchAddTodo,
  fetchAddTodoList,
  fetchDeleteTodo,
  fetchDeleteTodoList,
  fetchUpdateTodo,
  fetchUpdateTodoList,
  Board,
  fetchAddBoard,
  fetchDeleteBoard,
  fetchGetAllBoards,
  fetchUpdateBoard,
} from "@/entities";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TaskBoardState = {
  taskBoards: Board[];
};

const initialState: TaskBoardState = {
  taskBoards: [],
};

export const taskBoardSlice = createSlice({
  name: "taskBoard",
  initialState,
  reducers: {
    moveTodo: (
      state,
      action: PayloadAction<{
        sourceListId: string;
        targetListId: string;
        boardId: string;
        taskId: string;
      }>
    ) => {
      const { sourceListId, targetListId, taskId, boardId } = action.payload;

      const board = state.taskBoards.find((board) => board.id === boardId);

      if (board) {
        const sourceList = board.lists.find((list) => list.id === sourceListId);
        const targetList = board.lists.find((list) => list.id === targetListId);

        if (sourceList && targetList) {
          const task = sourceList.tasks.find((task) => task.id === taskId);
          if (task) {
            sourceList.tasks = sourceList.tasks.filter(
              (task) => task.id !== taskId
            );
            targetList.tasks.push(task);
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddTodo.fulfilled, (state, action) => {
      const { id, name, description, dueDate, listId, priority, boardId } =
        action.payload;
      const task: Task = {
        id,
        name,
        description,
        dueDate,
        priority,
      };
      const board = state.taskBoards.find((board) => board.id === boardId);
      if (board) {
        const list = board.lists.find((list) => list.id === listId);

        if (list) {
          list.tasks.push(task);
        }
      }
    });
    builder.addCase(fetchDeleteTodo.fulfilled, (state, action) => {
      const { id, listId, boardId } = action.payload;

      const board = state.taskBoards.find((board) => board.id === boardId);

      if (board) {
        const list = board.lists.find((list) => list.id === listId);

        if (list) {
          list.tasks = list.tasks.filter((task) => task.id !== id);
        }
      }
    });
    builder.addCase(fetchUpdateTodo.fulfilled, (state, action) => {
      const { id, name, description, dueDate, listId, priority, boardId } =
        action.payload;

      const task: Task = {
        id,
        name,
        description,
        dueDate,
        priority,
      };

      const board = state.taskBoards.find((board) => board.id === boardId);

      if (board) {
        const list = board.lists.find((list) => list.id === listId);

        if (list) {
          const taskIndex = list.tasks.findIndex((task) => task.id === id);
          list.tasks[taskIndex] = task;
        }
      }
    });

    builder.addCase(fetchAddTodoList.fulfilled, (state, action) => {
      const { boardId } = action.payload;

      const board = state.taskBoards.find((board) => board.id === boardId);

      if (board) {
        board.lists.push(action.payload);
      }
    });
    builder.addCase(fetchDeleteTodoList.fulfilled, (state, action) => {
      const { boardId, id } = action.payload;
      const board = state.taskBoards.find((board) => board.id === boardId);

      if (board) {
        board.lists = board.lists.filter((list) => list.id !== id);
      }
    });
    builder.addCase(fetchUpdateTodoList.fulfilled, (state, action) => {
      const { id, name, boardId } = action.payload;
      const board = state.taskBoards.find((board) => board.id === boardId);

      if (board) {
        const list = board.lists.find((list) => list.id === id);
        if (list) {
          list.name = name;
        }
      }
    });

    builder.addCase(fetchAddBoard.fulfilled, (state, action) => {
      state.taskBoards.push({
        id: action.payload.id,
        name: action.payload.name,
        lists: action.payload.lists || [],
      });
    });
    builder.addCase(fetchDeleteBoard.fulfilled, (state, action) => {
      state.taskBoards = state.taskBoards.filter(
        (board) => board.id !== action.payload.id
      );
    });
    builder.addCase(fetchGetAllBoards.fulfilled, (state, action) => {
      state.taskBoards = action.payload;
    });
    builder.addCase(fetchUpdateBoard.fulfilled, (state, action) => {
      const { id, name } = action.payload;

      const board = state.taskBoards.find((board) => board.id === id);

      if (board) {
        board.name = name;
      }
    });
  },
});

export const { moveTodo } = taskBoardSlice.actions;
export default taskBoardSlice.reducer;
