import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './item.controller';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Item } from './item-entity';
import { ItemsRepository } from './dto/item-repository';
import { ItemsService } from './item.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Item
        ]),
      ],
      providers: [ApplicationExceptionHandler,ItemsRepository,ItemsService],
      controllers: [ItemsController],
      exports: []
})
export class ItemsModule { }