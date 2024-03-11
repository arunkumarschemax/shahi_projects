import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FinishEntity } from "./finish.entity";
import { FinishController } from "./finish.controller";
import { FinishService } from "./finish.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";


@Module({
  imports: [
    
    TypeOrmModule.forFeature([FinishEntity,CategoryMappingEntity]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [FinishController],
  providers: [FinishService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo],
})
export class FinishModule {}
