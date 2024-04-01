import $api from "@/shared/cfg/axios-config";
import { AxiosResponse } from "axios";
import { TaskListType } from "../types/task-list";

class TodoListService {
  async addTodoList(taskListData: {
    name: string;
    ownerId: string;
  }): Promise<AxiosResponse<TaskListType>> {
    return await $api.post("/lists", taskListData);
  }

  async getAllTodoListsByOwnerId(
    ownerId: string
  ): Promise<AxiosResponse<{ id: string; name: string; ownerId: string }[]>> {
    return await $api.get(`/lists/by-user/${ownerId}`);
  }

  async deleteTodoList(id: string): Promise<AxiosResponse<TaskListType>> {
    return await $api.delete(`/lists/${id}`);
  }

  async updateTodoList(
    id: string,
    data: {
      name: string;
    }
  ): Promise<AxiosResponse<TaskListType>> {
    return await $api.patch(`/lists/${id}`, data);
  }
}

const todoListService = new TodoListService();

export { todoListService };
