import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CoLine } from './co-line.entity';
import { CoLineService } from './co-line.service';
import { CoLineController } from './co-line.controller';


@Module({
    imports: [
        TypeOrmModule.forFeature([CoLine]),
      ],
      providers: [ApplicationExceptionHandler,CoLineService],
      controllers: [CoLineController],
      exports: []
})
export class CoLineModule { }