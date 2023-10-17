import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ItemCreation } from './item_creation.entity';
import { ItemCreationController } from './item_creation.controller';
import { ItemCreationService } from './item_creation.service';
import { ItemCreationAdapter } from './dto/item_creation.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemCreation]),
  ],
  controllers: [ItemCreationController],
  providers: [ItemCreationService,ItemCreationAdapter,ApplicationExceptionHandler],
  exports:[]
})
export class ItemCreationModule {}
