import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { Thickness } from "./thickness.entity";
import { ThicknessController } from "./thickness.controller";
import { ThicknessRepository } from "./thickness.repo";
import { ThicknessService } from "./thickness.service";
import { M3TrimsCategoryMappingRepo } from "../m3-trims/m3-trims-category-mapping.repo";
import { CategoryMappingEntity } from "../m3-trims/m3-trims-category-mapping.entity";


@Module({
    imports: [
      TypeOrmModule.forFeature([Thickness,CategoryMappingEntity]),
    ],
    controllers: [ThicknessController],
    providers: [ThicknessService,ApplicationExceptionHandler,ThicknessRepository,M3TrimsCategoryMappingRepo]
  })
  export class ThicknessModule {}