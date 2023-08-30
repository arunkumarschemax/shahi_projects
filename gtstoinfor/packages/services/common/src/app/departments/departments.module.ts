// import { LogsService } from '@gtpl/shared-services/user-logs';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsController } from './departments.controller';
import { Departments } from './departments.entity';
import { DepartmentsAdapter } from './dto/departments.adapter';
import { DepartmentService } from './departments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Departments]),
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentService,DepartmentsAdapter,ApplicationExceptionHandler]
})
export class DepartmentsModule {}
