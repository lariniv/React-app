import $api from "@/shared/cfg/axios-config";
import { AxiosResponse } from "axios";
import { Activity, AddActivity } from "..";

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

const activityService = new ActivityService();

export { activityService };
