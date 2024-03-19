import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LineEntity } from "./line-entity";
import { LineController } from "./line-controller";
import { LineService } from "./line.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";

@Module({
    imports:[TypeOrmModule.forFeature([LineEntity,CategoryMappingEntity])],
    controllers:[LineController],
    providers:[LineService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo]
})
export class LineModule{}