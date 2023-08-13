import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomGroups } from './custom-groups.entity';
import { CustomGroupsController } from './custom-groups.controller';
import { CustomGroupsService } from './custom-groups.service';
import { CustomGroupsAdapter } from './dto/custom-groups.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
  TypeOrmModule.forFeature([CustomGroups]),
  ],
  controllers: [CustomGroupsController],
  providers: [CustomGroupsService,CustomGroupsAdapter,ApplicationExceptionHandler]
})
export class CustomGroupsModule {}