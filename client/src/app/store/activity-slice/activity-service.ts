import $api from "@/app/cfg/axios-config";
import { Activity } from "./activity-slice";

class ActivityService {
  async getAllActivitiesByUserId(userId: string): Promise<Activity[]> {
    return await $api.get(`/activities/by-user/${userId}`);
  }

  async getActivityByTaskId(taskId: string): Promise<Activity[]> {
    return await $api.get(`/activities/by-task/${taskId}`);
  }

  async addActivity(activityData: Activity): Promise<Activity> {
    return await $api.post("/activities", activityData);
  }

  async deleteActivitiesByTaskId(taskId: string): Promise<{ count: number }> {
    return await $api.delete(`/activities/by-task/${taskId}`);
  }
}

export default new ActivityService();
