import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarmentsAdapter } from './dto/garments.adapter';
import { GarmentsController } from './garments.controller';
import { GarmentsService } from './garments.service';
import { Garments } from './garments.entity';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([Garments]),
  ],
  controllers: [GarmentsController],
  providers: [GarmentsService,GarmentsAdapter,ApplicationExceptionHandler],
  exports:[GarmentsService]
})
export class GarmentsModule {}
