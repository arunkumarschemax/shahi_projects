
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemsRepository } from './items.repo';
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { Items } from './items.entity';
import { ItemsAdapter } from "./dto/items.adapter";

@Module({
    imports: [
      TypeOrmModule.forFeature([Items])],
    controllers: [ItemsController],
    providers: [ItemsService,ItemsAdapter,ItemsRepository,ApplicationExceptionHandler]
  })
  export class ItemsModule { }