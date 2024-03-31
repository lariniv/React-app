import { Injectable } from '@nestjs/common';
import { List } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}

  async createList(name: string, owner_id: string): Promise<List> {
    return this.prisma.list.create({
      data: {
        name,
        owner_id,
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

  async deleteList(id: string): Promise<List> {
    return this.prisma.list.delete({
      where: {
        id,
      },
    });
  }

  async updateList(id: string, name: string): Promise<List> {
    return this.prisma.list.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }
}
