import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { TrimParamsMappingController } from "./trim-params-mapping.controller";
import { TrimParamsMappingService } from "./trim-params-mapping.service";
import { TrimParamsMapping } from "./trim-params-mapping.entity";
import { TrimParamsMappingRepository } from "./trim-params-mapping.repo";

@Module({
    imports: [
      TypeOrmModule.forFeature([TrimParamsMapping]),
    ],
    controllers: [TrimParamsMappingController],
    providers: [TrimParamsMappingService,ApplicationExceptionHandler,TrimParamsMappingRepository]
  })
  export class TrimParamsMappingModule {}