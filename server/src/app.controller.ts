import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Post()
  createTask(): string {
    return 'This action adds a new task';
  }

  @Get()
  getAllTasks(): string {
    return 'This action returns all tasks';
  }

  @Get(':id')
  getTask(@Param('id') id: string): string {
    console.log(id);
    return 'This action returns a task';
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): string {
    console.log(id);
    return 'This action removes a task';
  }

  @Patch(':id')
  updateTask(@Param('id') id: string): string {
    console.log(id);
    return 'This action updates a task';
  }
}
