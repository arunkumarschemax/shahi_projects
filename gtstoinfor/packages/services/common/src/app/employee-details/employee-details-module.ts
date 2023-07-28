import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmplyeeDetails } from './dto/employee-details-entity';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { EmployeeDetailsService } from './employee-details.service';
import { EmployeeDetailsController } from './emploe-details.controller';
import { EmployeeDetailsRepo } from './dto/employee-detail-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmplyeeDetails]),
  ],
  providers: [EmployeeDetailsService,ApplicationExceptionHandler,EmployeeDetailsRepo],
  controllers: [EmployeeDetailsController],
  exports: []
})
export class EmployeeDetailsModule { }
