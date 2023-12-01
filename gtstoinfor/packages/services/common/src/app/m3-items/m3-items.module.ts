import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { M3ItemsAdapter } from "./m3-items.adaptor";
import { M3ItemsController } from "./m3-items.controller";
import { M3ItemsService } from "./m3-items.service";
import { M3ItemsEntity } from "./m3-items.entity";
import { M3ItemsRepo } from "./m3-items.repository";
import { ProductGroup } from "./product-group-entity";
import { RmCreationEntity } from "./rm-items.entity";


@Module({
    imports: [TypeOrmModule.forFeature([M3ItemsEntity,ProductGroup,RmCreationEntity])],
    controllers: [M3ItemsController],
    providers: [M3ItemsService, ApplicationExceptionHandler, M3ItemsAdapter,M3ItemsRepo],
    exports: [TypeOrmModule, M3ItemsService]
})

export class M3ItemsModule { }