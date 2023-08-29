import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Settings } from './settings.entity';
import { SettingsController } from './settings.controller';
import { SettingsService } from '@project-management-system/shared-services';

@Module({
    imports: [
        TypeOrmModule.forFeature([Settings]),
        ],
        controllers: [SettingsController],
        providers: [SettingsService,ApplicationExceptionHandler]
      })
export class SettingsModule{}