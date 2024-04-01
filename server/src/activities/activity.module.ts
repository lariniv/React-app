import { ActivityController } from './activity.controller';

import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [ActivityController],
  providers: [ActivityService, PrismaService],
})
export class ActivityModule {}
