import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { QualityService } from "./quality.service";
import { QualityController } from "./quality.controller";
import { QualityEntity } from "./quality.entity";
import { QualityAdapter } from "./quality.adaptor";



@Module({
    imports: [TypeOrmModule.forFeature([QualityEntity])],
    controllers: [QualityController],
    providers: [QualityService, ApplicationExceptionHandler, QualityAdapter],
    exports: [TypeOrmModule, QualityService]
})

export class QualityModule { }