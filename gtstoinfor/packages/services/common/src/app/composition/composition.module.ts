import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CompositionEnitty } from './composition.entity';
import { CompositionController } from './composition.controller';
import { CompositionService } from './composition.services';
import { CompositionAdapter } from './composition-dto/composition.adapter';
import { CompositionRepository } from './composition-repository/composition.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompositionEnitty]),
  ],
  controllers: [CompositionController],
  providers: [CompositionRepository,CompositionService,CompositionAdapter,ApplicationExceptionHandler]
})
export class CompositionModule {}
