import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { M3TrimsEntity } from "./m3-trims.entity";
import { M3TrimsController } from "./m3-trims.controller";
import { M3TrimsService } from "./m3-trims.service";
import { M3TrimsAdapter } from "./m3-trims.adaptor";
import { M3TrimsRepo } from "./m3-trims.repository";
import { CategoryMappingEntity } from "./m3-trims-category-mapping.entity";
import { M3TrimsCategoryMappingRepo } from "./m3-trims-category-mapping.repo";


@Module({
    imports: [TypeOrmModule.forFeature([M3TrimsEntity,CategoryMappingEntity])],
    controllers: [M3TrimsController],
    providers: [M3TrimsService, ApplicationExceptionHandler, M3TrimsAdapter,M3TrimsRepo,M3TrimsCategoryMappingRepo],
    exports: [TypeOrmModule, M3TrimsService,M3TrimsCategoryMappingRepo]
})

export class M3TrimsModule { }