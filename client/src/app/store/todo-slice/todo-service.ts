import $api from "@/app/cfg/axios-config";
import { AxiosResponse } from "axios";
import { Task } from "./types/task-type";
import { TaskDto } from "./types/task-dto";

class TaskService {
  async addTask(
    taskData: TaskDto
  ): Promise<AxiosResponse<Task & { listId: string }>> {
    return await $api.post("/tasks", taskData);
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
