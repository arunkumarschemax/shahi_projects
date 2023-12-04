import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { QualitysService } from "./qualitys.service";
import { qualitysController } from "./qualitys.controller";
import { QualitysEntity } from "./qualitys.entity";
import { QualitysAdapter } from "./qualitys.adapter";



@Module({
    imports: [TypeOrmModule.forFeature([QualitysEntity])],
    controllers: [qualitysController],
    providers: [QualitysService, ApplicationExceptionHandler, QualitysAdapter],
    exports: [TypeOrmModule, QualitysService]
})

export class QualitysModule { }