import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ComponentMappingEntity } from './component-mapping.entity';
import { ComponentMappingController } from './component-mapping.controller';
import { ComponentMappingService } from './component-mapping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComponentMappingEntity]),
  ],
  controllers: [ComponentMappingController],
  providers: [ComponentMappingService,ApplicationExceptionHandler]
})
export class ComponentMappingModule {}
