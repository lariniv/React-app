import { ActivityService } from './activity.service';
import { ListService } from './list.service';
import { TodoService } from './todo.service';
import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ActivityService, ListService, TodoService, PrismaService],
})
export class AppModule {}
