import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SliderEntity } from "./slider-entity";
import { SliderController } from "./slider.controller";
import { SliderService } from "./slider-service";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";

@Module({
    imports:[TypeOrmModule.forFeature([SliderEntity,CategoryMappingEntity])],
    controllers:[SliderController],
    providers:[SliderService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo]
})
export class SliderModule{}