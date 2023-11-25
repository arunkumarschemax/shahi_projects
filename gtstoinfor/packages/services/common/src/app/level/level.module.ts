import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LevelsAdapter } from './dto/level.adapter';
import { Levels } from './level.entity';
import { LevelController } from './level.controller';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { LevelService } from './level.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Levels]),
        ],
        controllers: [LevelController],
        providers: [LevelsAdapter,LevelService,ApplicationExceptionHandler]
      })
export class LevelModule{
    
}