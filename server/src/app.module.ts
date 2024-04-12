import { BoardsModule } from './boards/boards.module';
import { BoardsController } from './boards/boards.controller';
import { ActivityModule } from './activities/activity.module';
import { TaskModule } from './tasks/task.module';
import { TasksController } from './tasks/task.controller';
import { ActivityService } from './activities/activity.service';
import { TaskService } from './tasks/task.service';
import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ListsModule } from './lists/list.module';
import { BoardsService } from './boards/boards.service';

@Module({
  imports: [BoardsModule, ActivityModule, TaskModule, ListsModule],
  controllers: [BoardsController, TasksController, AppController],
  providers: [ActivityService, TaskService, PrismaService, BoardsService],
})
export class AppModule {}
