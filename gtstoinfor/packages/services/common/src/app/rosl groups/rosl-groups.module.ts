import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ROSLGroups } from './rosl-groups.entity';
import { ROSLGroupsController } from './rosl-groups.controller';
import { ROSLGroupsService } from './rosl-groups.service';
import { ROSLGroupsAdapter } from './dto/rosl-groups.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
  TypeOrmModule.forFeature([ROSLGroups]),
  ],
  controllers: [ROSLGroupsController],
  providers: [ROSLGroupsService,ROSLGroupsAdapter,ApplicationExceptionHandler]
})
export class ROSLGroupsModule {}