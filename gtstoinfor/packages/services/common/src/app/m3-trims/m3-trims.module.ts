import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { M3TrimsEntity } from "./m3-trims.entity";
import { M3TrimsController } from "./m3-trims.controller";
import { M3TrimsService } from "./m3-trims.service";
import { M3TrimsAdapter } from "./m3-trims.adaptor";
import { M3TrimsRepo } from "./m3-trims.repository";


@Module({
    imports: [TypeOrmModule.forFeature([M3TrimsEntity])],
    controllers: [M3TrimsController],
    providers: [M3TrimsService, ApplicationExceptionHandler, M3TrimsAdapter,M3TrimsRepo],
    exports: [TypeOrmModule, M3TrimsService]
})

export class M3TrimsModule { }