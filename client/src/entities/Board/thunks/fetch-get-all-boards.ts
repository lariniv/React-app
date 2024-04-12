import { createAsyncThunk } from "@reduxjs/toolkit";
import { Board, boardService } from "..";
import { todoListService, todoService } from "@/entities";

export const fetchGetAllBoards = createAsyncThunk(
  "todo/fetchGetAllBoards",
  async ({ ownerId }: { ownerId: string }, { rejectWithValue }) => {
    try {
      const response = await boardService.getBoardsByOwnerId(ownerId);
      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      const boardLists = response.data;

      const boards = await Promise.all(
        boardLists.map(async (board) => {
          const res = await todoListService.getListByBoardId(board.id);
          if (res.status !== 200) {
            throw rejectWithValue(response.data);
          }

          const taskLists = await Promise.all(
            res.data.map(async (list) => {
              const taskResponse = await todoService.getTaskByListId(list.id);
              if (taskResponse.status !== 200) {
                throw rejectWithValue(response.data);
              }
              return {
                id: list.id,
                name: list.name,
                tasks: taskResponse.data,
              };
            })
          );

          return {
            id: board.id,
            name: board.name,
            lists: taskLists ? taskLists : [],
          } as Board;
        })
      );

      return boards;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
