import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}
  async createBoard(data: Prisma.BoardCreateInput) {
    const board = this.prisma.board.create({ data });
    return { ...board, lists: [] };
  }

  async findAllById(ownerId: string) {
    return this.prisma.board.findMany({ where: { ownerId } });
  }

  async update(id: string, data: Prisma.BoardUpdateInput) {
    return this.prisma.board.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.board.delete({ where: { id } });
  }
}
