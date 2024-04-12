import { Injectable } from '@nestjs/common';
import { List, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}

  async createList(name: string, boardId: string): Promise<List> {
    return this.prisma.list.create({
      data: {
        name,
        boardId,
      },
    });
  }

  async getAllLists(): Promise<List[]> {
    return this.prisma.list.findMany();
  }

  async getListById(id: string): Promise<List> {
    return this.prisma.list.findUnique({
      where: {
        id,
      },
    });
  }

  async getListsByBoardId(boardId: string): Promise<List[]> {
    return this.prisma.list.findMany({
      where: {
        boardId,
      },
    });
  }

  async deleteList(id: string): Promise<List> {
    return this.prisma.list.delete({
      where: {
        id,
      },
    });
  }

  async updateList(id: string, data: Prisma.ListUpdateInput): Promise<List> {
    return this.prisma.list.update({
      where: {
        id,
      },
      data,
    });
  }
}
