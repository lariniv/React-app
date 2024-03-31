import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { List } from '@prisma/client';
import { ListsService } from './list.service';

@Controller('lists')
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Post()
  async createList(
    @Body('name') name: string,
    @Body('owner_id') owner_id: string,
  ): Promise<List> {
    return this.listsService.createList(name, owner_id);
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
  async deleteList(@Body('id') id: string): Promise<List> {
    return this.listsService.deleteList(id);
  }

  @Patch(':id')
  async updateList(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<List> {
    return this.listsService.updateList(id, name);
  }
}
