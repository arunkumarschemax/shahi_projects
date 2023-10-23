import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemGroupAdapter } from './dto/item-group.adapter';
import { ItemGroup } from './item-group.entity';
import { ItemGroupController } from './item-group.controller';
import { ItemGroupService } from './item-group.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
    imports: [
        TypeOrmModule.forFeature([ItemGroup]),
        ],
        controllers: [ItemGroupController],
        providers: [ItemGroupService,ItemGroupAdapter,ApplicationExceptionHandler],
        exports:[ItemGroupService]
      })
export class ItemGroupModule{
}