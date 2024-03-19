import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { TrimBuyerEntity } from "./trim-buyer-entity";
import { TrimBuyerController } from "./trim-buyer.controller";
import { TrimBuyerService } from "./trim-buyer.service";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";

@Module({
    imports:[TypeOrmModule.forFeature([TrimBuyerEntity,CategoryMappingEntity])],
    controllers:[TrimBuyerController],
    providers:[TrimBuyerService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo]
})
export class TrimBuyerModule{}