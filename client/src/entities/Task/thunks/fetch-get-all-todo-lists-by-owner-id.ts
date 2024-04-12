import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskList, todoListService, todoService } from "..";

export const fetchGetAllTodoListsByOwnerId = createAsyncThunk(
  "todo/fetchGetAllTodoListsByOwnerId",
  async (
    { ownerId, boardId }: { ownerId: string; boardId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await todoListService.getAllTodoListsByOwnerId(ownerId);

      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      const taskLists = response.data;

      const tasks = await Promise.all(
        taskLists.map(async (list) => {
          const res = await todoService.getTaskByListId(list.id);
          return res.data;
        })
      );

      const data: TaskList[] = [];
      for (let i = 0; i < taskLists.length; i++) {
        const taskList: TaskList = {
          id: taskLists[i].id,
          name: taskLists[i].name,
          boardId,
          tasks: [],
        };
        taskList.tasks = tasks[i];
        data.push(taskList);
      }

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
