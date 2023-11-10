import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { RacksService } from "./rack.service";
import { RacksEntity } from "./rack.entity";
import { RacksController } from "./rack.controller";
import { RacksAdapter } from "./rack.adaptor";


@Module({
    imports: [TypeOrmModule.forFeature([RacksEntity])],
    controllers: [RacksController],
    providers: [RacksService, ApplicationExceptionHandler, RacksAdapter],
    exports: [TypeOrmModule, RacksService]
})

export class RacksModule { }