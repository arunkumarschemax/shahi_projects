import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Components } from './components.entity';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';
import { ComponentsAdapter } from './dto/components.adapter';

@Module({
  imports: [
  TypeOrmModule.forFeature([Components]),
  ],
  controllers: [ComponentsController],
  providers: [ComponentsService,ComponentsAdapter,ApplicationExceptionHandler]
})
export class ComponentsModule {


  
}