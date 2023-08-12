import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import {Company } from './company.entity';
import {CompanyAdapter} from './dto/company.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { M3GenericService } from '@project-management-system/shared-services';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Company]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService,CompanyAdapter,ApplicationExceptionHandler,M3GenericService],
  exports: [CompanyService],
})
export class CompanyModule {}
