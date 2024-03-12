import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { Type } from "./type.entity";
import { TypeController } from "./type.controller";
import { TypeService } from "./type.service";
import { TypeRepository } from "./type.repo";
import { CategoryMappingEntity } from "../m3-trims/m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "../m3-trims/m3-trims-category-mapping.repo";



@Module({
    imports: [
      TypeOrmModule.forFeature([Type,CategoryMappingEntity]),
    ],
    controllers: [TypeController],
    providers: [TypeService,ApplicationExceptionHandler,TypeRepository,M3TrimsCategoryMappingRepo]
  })
  export class TypeModule {}