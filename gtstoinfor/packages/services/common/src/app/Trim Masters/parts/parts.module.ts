import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { PartsEntity } from "./parts.entity";
import { PartsController } from "./parts.controller";
import { PartsService } from "./parts.service";

@Module({
    imports:[TypeOrmModule.forFeature([PartsEntity])],
    controllers:[PartsController],
    providers:[PartsService,ApplicationExceptionHandler]
})
export class PartsModule{}