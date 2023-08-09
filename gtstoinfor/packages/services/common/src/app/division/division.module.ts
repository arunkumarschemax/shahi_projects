import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Division } from './division.entity';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { DivisionController } from './division.controller';
import { DivisionAdapter } from './dto/division.adapter';
import { DivisionService } from './division.service';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Division]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [DivisionController],
  providers: [DivisionService,DivisionAdapter,ApplicationExceptionHandler],
  exports: [DivisionService],
})
export class DivisionModule {}
