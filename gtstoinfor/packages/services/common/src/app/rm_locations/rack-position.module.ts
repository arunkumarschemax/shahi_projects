import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { RackPositionEntity } from "./rack-position.entity";
import { RackPositionController } from "./rack-position.controller";
import { RackPositionService } from "./rack-position.service";
import { RackPositionAdapter } from "./rack-position.adaptor";

@Module({
    imports: [TypeOrmModule.forFeature([RackPositionEntity])],
    controllers: [RackPositionController],
    providers: [RackPositionService, ApplicationExceptionHandler, RackPositionAdapter],
    exports: [TypeOrmModule, RackPositionService]
})

export class RackPositionModule { }