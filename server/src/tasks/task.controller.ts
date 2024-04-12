import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Prisma, Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(
    @Body() data: Prisma.TaskCreateInput,
  ): Promise<Task & { listId: string }> {
    return this.taskService.create(data);
  }

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  getTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne({ id: id });
  }

  @Delete(':id')
  async deleteTask(
    @Param('id') id: string,
  ): Promise<{ id: string; listId: string }> {
    const { id: taskId, listId } = await this.taskService.deleteTask({
      id: id,
    });
    return { id: taskId, listId };
  }

  @Get('/get-by-list/:listId')
  async findTasksByListId(@Param('listId') listId: string): Promise<Task[]> {
    return this.taskService.findTasksByListId(listId);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() data: Prisma.TaskUpdateInput,
  ): Promise<Task> {
    return this.taskService.updateTask({
      where: { id: id },
      data,
    });
  }
}
