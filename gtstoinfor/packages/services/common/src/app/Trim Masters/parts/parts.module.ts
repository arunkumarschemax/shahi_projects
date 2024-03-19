import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { PartsEntity } from "./parts.entity";
import { PartsController } from "./parts.controller";
import { PartsService } from "./parts.service";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";

@Module({
    imports:[TypeOrmModule.forFeature([PartsEntity,CategoryMappingEntity])],
    controllers:[PartsController],
    providers:[PartsService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo]
})
export class PartsModule{}