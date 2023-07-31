import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Garments } from './garments.entity';
import { GarmentsController } from './garments.controller';
import { GarmentsService } from './garments.service';
import { GarmentsAdapter } from './dto/garments.adapter';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Garments]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [GarmentsController],
  providers: [GarmentsService,GarmentsAdapter,ApplicationExceptionHandler],
  exports: [GarmentsService],
})
export class GarmentsModule {}
