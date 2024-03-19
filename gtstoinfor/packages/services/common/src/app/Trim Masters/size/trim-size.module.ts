import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { TrimSizeEntity } from "./trim-size-entity";
import { TrimSizeController } from "./trim-size.controller";
import { TrimSizeService } from "./trim-size.service";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";

@Module({
    imports:[TypeOrmModule.forFeature([TrimSizeEntity,CategoryMappingEntity])],
    controllers:[TrimSizeController],
    providers:[TrimSizeService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo]
})
export class TrimSizeModule{}