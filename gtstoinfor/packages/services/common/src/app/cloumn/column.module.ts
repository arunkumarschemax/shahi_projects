import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ColumnController } from "./column.controller";
import { Columns } from "./column.entity";
import { ColumnRepository } from "./column.repo";
import { ColumnService } from "./column.service";

@Module({
    imports: [
      TypeOrmModule.forFeature([Columns]),
    ],
    controllers: [ColumnController],
    providers: [ColumnService,ApplicationExceptionHandler,ColumnRepository]
  })
  export class ColumnModule {}