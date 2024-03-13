import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { TrimUomController } from "./trim-uom.controller";
import { TrimUomEntity } from "./trim-uom.entity";
import { TrimUomService } from "./trim-uom.service";


@Module({
  imports: [
    
    TypeOrmModule.forFeature([TrimUomEntity,CategoryMappingEntity]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [TrimUomController],
  providers: [TrimUomService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo],
})
export class TrimUomModule {}
