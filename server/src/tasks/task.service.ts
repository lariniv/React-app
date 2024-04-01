/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Task, TaskPriority } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    data.dueDate = new Date(data.dueDate);
    if (!data.priority) data.priority = TaskPriority.LOW;

    return await this.prisma.task.create({
      data,
    });
  }

  async findAll(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async findOne(where: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
    return await this.prisma.task.findUnique({ where });
  }

  async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return this.prisma.task.delete({
      where,
    });
  }

  async findTasksByListId(listId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        listId: listId,
      },
    });
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { data, where } = params;
    return this.prisma.task.update({
      data,
      where,
    });
  }
}
