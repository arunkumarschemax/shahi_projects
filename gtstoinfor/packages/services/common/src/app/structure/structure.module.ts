import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { Structure } from "./structure.entity";
import { StructureController } from "./structure.controller";
import { StructureRepository } from "./structure.repo";
import { StructureService } from "./structure.service";


@Module({
    imports: [
      TypeOrmModule.forFeature([Structure]),
    ],
    controllers: [StructureController],
    providers: [StructureService,ApplicationExceptionHandler,StructureRepository]
  })
  export class StructureModule {}