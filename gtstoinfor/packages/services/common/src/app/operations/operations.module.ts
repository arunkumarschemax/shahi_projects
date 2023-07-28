import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Operations } from './operation.entity';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operation.service';
import { OperationsAdapter } from './dto/operation.adapter';
 
@Module({
  imports: [
    
    TypeOrmModule.forFeature([Operations]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [OperationsController],
  providers: [OperationsService,OperationsAdapter,ApplicationExceptionHandler],
  exports: [OperationsService],
})
export class OperationsModule {}
