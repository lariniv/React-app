import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { List, Prisma } from '@prisma/client';
import { ListsService } from './list.service';

@Controller('lists')
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Post()
  async createList(
    @Body('name') name: string,
    @Body('boardId') boardId: string,
  ): Promise<List> {
    return this.listsService.createList(name, boardId);
  }

  @Get('by-board/:boardId')
  async getListsByBoardId(@Param('boardId') boardId: string): Promise<List[]> {
    return this.listsService.getListsByBoardId(boardId);
  }

  @Get()
  async getLists(): Promise<List[]> {
    return this.listsService.getAllLists();
  }

  @Get(':id')
  async getListById(@Param('id') id: string): Promise<List> {
    return this.listsService.getListById(id);
  }

  @Delete(':id')
  async deleteList(@Param('id') id: string): Promise<List> {
    return this.listsService.deleteList(id);
  }

  @Patch(':id')
  async updateList(
    @Param('id') id: string,
    @Body() data: Prisma.ListUpdateInput,
  ): Promise<List> {
    return this.listsService.updateList(id, data);
  }
}
