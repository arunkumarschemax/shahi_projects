import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { Structure } from "./structure.entity";
import { StructureController } from "./structure.controller";
import { StructureRepository } from "./structure.repo";
import { StructureService } from "./structure.service";
import { CategoryMappingEntity } from "../m3-trims/m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "../m3-trims/m3-trims-category-mapping.repo";


@Module({
    imports: [
      TypeOrmModule.forFeature([Structure,CategoryMappingEntity]),
    ],
    controllers: [StructureController],
    providers: [StructureService,ApplicationExceptionHandler,StructureRepository,M3TrimsCategoryMappingRepo]
  })
  export class StructureModule {}