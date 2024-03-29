/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, ToDo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ToDoCreateInput): Promise<ToDo> {
    return await this.prisma.toDo.create({ data });
  }

  async findAll(): Promise<ToDo[]> {
    return await this.prisma.toDo.findMany();
  }

  async findOne(where: Prisma.ToDoWhereUniqueInput): Promise<ToDo | null> {
    return await this.prisma.toDo.findUnique({ where });
  }

  async deletePost(where: Prisma.ToDoWhereUniqueInput): Promise<ToDo> {
    return this.prisma.toDo.delete({
      where,
    });
  }

  async updatePost(params: {
    where: Prisma.ToDoWhereUniqueInput;
    data: Prisma.ToDoUpdateInput;
  }): Promise<ToDo> {
    const { data, where } = params;
    return this.prisma.toDo.update({
      data,
      where,
    });
  }
}
