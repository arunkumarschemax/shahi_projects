import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { LengthEntity } from "./length-entity";
import { LengthController } from "./length.controller";
import { LengthService } from "./length.service";

@Module({
    imports:[TypeOrmModule.forFeature([LengthEntity])],
    controllers:[LengthController],
    providers:[LengthService,ApplicationExceptionHandler]
})
export class LengthModule{}