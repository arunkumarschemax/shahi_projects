import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { LengthEntity } from "./length-entity";
import { LengthController } from "./length.controller";
import { LengthService } from "./length.service";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";

@Module({
    imports:[TypeOrmModule.forFeature([LengthEntity,CategoryMappingEntity])],
    controllers:[LengthController],
    providers:[LengthService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo]
})
export class LengthModule{}