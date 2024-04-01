import $api from "@/app/cfg/axios-config";
import { Task, TaskDto } from "./todo-lists-slice";
import { AxiosResponse } from "axios";

class TaskService {
  async addTask(
    taskData: TaskDto
  ): Promise<AxiosResponse<Task & { listId: string }>> {
    return await $api.post("/lists", taskData);
  }

  async deleteTask(
    id: string
  ): Promise<AxiosResponse<{ id: string; listId: string }>> {
    return await $api.delete(`/tasks/${id}`);
  }

  async getTaskByListId(listId: string): Promise<AxiosResponse<Task[]>> {
    return await $api.get(`/tasks/get-by-list/${listId}`);
  }

  async updateTask(
    id: string,
    data: Partial<TaskDto>
  ): Promise<AxiosResponse<Task & { listId: string }>> {
    return await $api.patch(`/tasks/${id}`, data);
  }
}

export default new TaskService();
