import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { PlyEntity } from "./ply.entity";
import { PlyController } from "./ply.controller";
import { PlyService } from "./ply.service";

@Module({
    imports:[TypeOrmModule.forFeature([PlyEntity])],
    controllers:[PlyController],
    providers:[PlyService,ApplicationExceptionHandler]
})
export class PlyModule{}