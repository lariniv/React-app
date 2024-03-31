import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TaskService, PrismaService],
})
export class TaskModule {}
