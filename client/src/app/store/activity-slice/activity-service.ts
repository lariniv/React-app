import $api from "@/app/cfg/axios-config";
import { Activity, AddActivity } from "./activity-slice";
import { AxiosResponse } from "axios";

class ActivityService {
  async getActivitiesByOwnerId(
    ownerId: string
  ): Promise<AxiosResponse<Activity[]>> {
    return await $api.get(`/activities/by-user/${ownerId}`);
  }

  async getActivityByTaskId(
    taskId: string
  ): Promise<AxiosResponse<Activity[]>> {
    return await $api.get(`/activities/by-task/${taskId}`);
  }

  async addActivity(
    activityData: Activity,
    ownerId: string
  ): Promise<AxiosResponse<Activity>> {
    return await $api.post("/activities", { ...activityData, ownerId });
  }

  async addListActivity(
    activityData: Omit<AddActivity, "taskId">,
    ownerId: string
  ): Promise<AxiosResponse<AddActivity>> {
    return await $api.post("/activities/list", { ...activityData, ownerId });
  }

  async deleteActivitiesByTaskId(
    taskId: string
  ): Promise<AxiosResponse<{ count: number }>> {
    return await $api.delete(`/activities/by-task/${taskId}`);
  }
}

export default new ActivityService();
