import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('get-all-boards/:id')
  async getAllBoards(@Param('id') id: string) {
    return this.boardsService.findAllById(id);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }

  @Post()
  async addBoard(@Body() data: Prisma.BoardCreateInput) {
    return this.boardsService.createBoard(data);
  }

  @Patch(':id')
  async updateBoard(
    @Param('id') id: string,
    @Body() data: Partial<Prisma.BoardCreateInput>,
  ) {
    return this.boardsService.update(id, data);
  }
}
