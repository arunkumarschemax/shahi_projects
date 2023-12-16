import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { WeightEntity } from './dto/weight-entity';
import { WeightService } from './weight-service';
import { weightController } from './weight-controller';
import { weightRepository } from './dto/weight-repo';

@Module({
    imports: [
        TypeOrmModule.forFeature([WeightEntity
        ]),
      ],
      providers: [ApplicationExceptionHandler,weightRepository,WeightService],
      controllers: [weightController],
      exports: []
})
export class WeightModule { }