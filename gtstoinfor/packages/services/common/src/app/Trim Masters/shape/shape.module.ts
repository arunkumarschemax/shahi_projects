import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ShapeEntity } from "./shape-entity";
import { ShapeController } from "./shape.controller";
import { ShapeService } from "./shape.service";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";

@Module({
    imports:[TypeOrmModule.forFeature([ShapeEntity,CategoryMappingEntity])],
    controllers:[ShapeController],
    providers:[ShapeService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo]
})
export class ShapeModule{}