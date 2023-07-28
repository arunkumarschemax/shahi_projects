import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { MasterBrandsController } from './master-brands.controller';
import { Brands } from './master-brands.entity';
import { MasterBrandRequest } from './dto/master-brands.request';
import { MasterBrandsService } from './master-brands.service';
import { MasterBrandAdapter } from './dto/master-brands.adapter';
 
@Module({
  imports: [
    
    TypeOrmModule.forFeature([Brands]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [MasterBrandsController],
  providers: [MasterBrandsService,MasterBrandAdapter,ApplicationExceptionHandler],
  exports: [MasterBrandsService],
})
export class MasterBrandsModule {}
