import { PrismaService } from 'src/prisma.service';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [BoardsController],
  providers: [BoardsService, PrismaService],
})
export class BoardsModule {}
