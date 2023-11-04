import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { RmCreationEntity } from './rm-items.entity';
import { RmCreationController } from './rm-items.controller';
import { RmCreationservice } from './rm-item.service';
import { RmCreationAdapter } from './dto/rm-item.adapter';
import { RmCreationRepository } from './rm-item.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([RmCreationEntity]),
  ],
  controllers: [RmCreationController],
  providers: [RmCreationservice,RmCreationAdapter,ApplicationExceptionHandler,RmCreationRepository],
  exports:[]
})
export class RmCreationModule {}
