import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity, ListActivity, Prisma } from '@prisma/client';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async getAllActivities(): Promise<Activity[]> {
    return this.activityService.getAllActivities();
  }

  @Get('by-user/:id')
  async getActivitiesByUserId(
    @Param('id') id: string,
  ): Promise<Array<Activity | ListActivity>> {
    return this.activityService.getActivitiesByUserId(id);
  }

  @Get('by-task/:id')
  async getActivityByTaskId(@Param('id') id: string): Promise<Activity[]> {
    return this.activityService.getActivityByTaskId(id);
  }

  @Get(':id')
  async getActivityById(@Param('id') id: string): Promise<Activity> {
    return this.activityService.getActivityById(id);
  }

  @Delete('by-task/:id')
  async deleteActivitiesByTaskId(
    @Param('id') id: string,
  ): Promise<Prisma.BatchPayload> {
    return this.activityService.deleteActivitiesByTaskId(id);
  }

  @Post('list')
  async createListActivity(
    @Body() data: Prisma.ListActivityCreateInput,
  ): Promise<ListActivity> {
    return this.activityService.createListActivity(data);
  }

  @Post()
  async createActivity(
    @Body() data: Prisma.ActivityCreateInput,
  ): Promise<Activity> {
    return this.activityService.createActivity(data);
  }
}
