import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { PlyEntity } from "./ply.entity";
import { PlyController } from "./ply.controller";
import { PlyService } from "./ply.service";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";

@Module({
    imports:[TypeOrmModule.forFeature([PlyEntity,CategoryMappingEntity])],
    controllers:[PlyController],
    providers:[PlyService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo]
})
export class PlyModule{}