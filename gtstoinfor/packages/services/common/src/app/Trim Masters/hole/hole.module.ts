import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { HoleEntity } from "./hole.entity";
import { HoleController } from "./hole.controller";
import { HoleService } from "./hole.service";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";


@Module({
  imports: [
    
    TypeOrmModule.forFeature([HoleEntity,CategoryMappingEntity]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [HoleController],
  providers: [HoleService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo],
})
export class HoleModule {}
