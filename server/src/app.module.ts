import { ActivityModule } from './activities/activity.module';
import { TaskModule } from './tasks/task.module';
import { TasksController } from './tasks/task.controller';
import { ActivityService } from './activities/activity.service';
import { TaskService } from './tasks/task.service';
import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ListsModule } from './lists/list.module';

@Module({
  imports: [ActivityModule, TaskModule, ListsModule],
  controllers: [TasksController, AppController],
  providers: [ActivityService, TaskService, PrismaService],
})
export class AppModule {}
