import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { ReclassificationEntity } from "./reclassification.entity";
import { ReclassificationService } from "./reclassification.service";
import { ReclassificationAdapter } from "./reclassification.adaptor";


@Module({
    imports: [TypeOrmModule.forFeature([ReclassificationEntity])],
    controllers: [ReclassificationModule],
    providers: [ReclassificationService, ApplicationExceptionHandler, ReclassificationAdapter],
    exports: [TypeOrmModule, ReclassificationService]
})

export class ReclassificationModule { }