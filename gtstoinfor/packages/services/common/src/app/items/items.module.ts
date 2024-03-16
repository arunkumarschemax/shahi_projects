
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemsRepository } from './items.repo';
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ItemsAdapter } from "./dto/items.adapter";
import { ItemEntity } from "../po-bom/entittes/item-entity";

@Module({
    imports: [
      TypeOrmModule.forFeature([ItemEntity])],
    controllers: [ItemsController],
    providers: [ItemsService,ItemsAdapter,ItemsRepository,ApplicationExceptionHandler]
  })
  export class ItemsModule { }