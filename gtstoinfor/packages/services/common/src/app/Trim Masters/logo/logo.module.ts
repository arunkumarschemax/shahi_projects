import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { LogoEntity } from "./logo-entity";
import { LogoController } from "./logo.controller";
import { LogoService } from "./logo.service";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";

@Module({
    imports:[TypeOrmModule.forFeature([LogoEntity,CategoryMappingEntity])],
    controllers:[LogoController],
    providers:[LogoService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo]
})
export class LogoModule{}