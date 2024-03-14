import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { AirHoleEntity } from "./air-hole.entity";
import { AirHoleController } from "./air-hole.controller";
import { AirHoleService } from "./air-hole.service";


@Module({
  imports: [
    
    TypeOrmModule.forFeature([AirHoleEntity,CategoryMappingEntity]),
   
  ],
  controllers: [AirHoleController],
  providers: [AirHoleService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo],
})
export class AirHoleModule {}
