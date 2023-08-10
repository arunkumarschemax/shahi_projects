import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import {Company } from './company.entity';
import {CompanyAdapter} from './dto/company.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Company]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService,CompanyAdapter,ApplicationExceptionHandler],
  exports: [CompanyService],
})
export class CompanyModule {}
