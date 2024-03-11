import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { QualityService } from "./quality.service";
import { QualityController } from "./quality.controller";
import { QualityEntity } from "./quality.entity";
import { QualityAdapter } from "./quality.adaptor";
import { CategoryMappingEntity } from "../m3-trims/m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "../m3-trims/m3-trims-category-mapping.repo";



@Module({
    imports: [TypeOrmModule.forFeature([QualityEntity,CategoryMappingEntity])],
    controllers: [QualityController],
    providers: [QualityService, ApplicationExceptionHandler, QualityAdapter,M3TrimsCategoryMappingRepo],
    exports: [TypeOrmModule, QualityService]
})

export class QualityModule { }