import { Module } from '@nestjs/common';
import { ListsService } from './list.service';
import { ListsController } from './list.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ListsController],
  providers: [ListsService, PrismaService],
})
export class ListsModule {}
