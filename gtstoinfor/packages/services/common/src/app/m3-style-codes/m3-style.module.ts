import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { M3StyleService } from "./m3-style.service";
import { M3StyleController } from "./m3-style.controller";
import { M3StyleEntity } from "./m3-style.entity";
import { M3StyleAdapter } from "./m3-style.adaptor";




@Module({
    imports: [TypeOrmModule.forFeature([M3StyleEntity])],
    controllers: [M3StyleController],
    providers: [M3StyleService, ApplicationExceptionHandler, M3StyleAdapter],
    exports: [TypeOrmModule, M3StyleService]
})

export class M3StyleModule { }