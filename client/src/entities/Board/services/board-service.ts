import $api from "@/shared/cfg/axios-config";
import { Board, BoardDto } from "..";
import { AxiosResponse } from "axios";

class BoardService {
  async addBoard(data: BoardDto): Promise<AxiosResponse<Board>> {
    return await $api.post("/boards", data);
  }

  async updateBoard(
    id: string,
    data: Partial<Board>
  ): Promise<AxiosResponse<Board>> {
    return await $api.patch(`/boards/${id}`, data);
  }

  async deleteBoard(id: string): Promise<AxiosResponse<Board>> {
    return await $api.delete(`/boards/${id}`);
  }

  async getBoardsByOwnerId(ownerId: string): Promise<AxiosResponse<Board[]>> {
    return await $api.get(`/boards/get-all-boards/${ownerId}`);
  }
}

const boardService = new BoardService();

export { boardService };
