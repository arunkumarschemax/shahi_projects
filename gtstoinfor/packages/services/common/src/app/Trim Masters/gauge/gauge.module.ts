import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { GaugeController } from "./gauge.controller";
import { GaugeEntity } from "./gauge.entity";
import { GaugeService } from "./gauge.service";


@Module({
  imports: [
    
    TypeOrmModule.forFeature([GaugeEntity,CategoryMappingEntity]),
   
  ],
  controllers: [GaugeController],
  providers: [GaugeService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo],
})
export class GaugeModule {}
