import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async getAllActivities() {
    return this.prisma.activity.findMany();
  }

  async getActivitiesByUserId(id: string) {
    return this.prisma.activity.findMany({
      where: { ownerId: id },
    });
  }

  async getActivityByTaskId(id: string) {
    return this.prisma.activity.findMany({
      where: { taskId: id },
    });
  }

  async createActivity(data: Prisma.ActivityCreateInput) {
    return this.prisma.activity.create({
      data,
    });
  }

  async deleteActivitiesByTaskId(id: string) {
    return this.prisma.activity.deleteMany({
      where: {
        taskId: id,
      },
    });
  }

  async getActivityById(id: string) {
    return this.prisma.activity.findUnique({
      where: {
        id,
      },
    });
  }
}
