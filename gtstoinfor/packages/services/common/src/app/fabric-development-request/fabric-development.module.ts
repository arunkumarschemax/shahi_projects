import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FabricDevelopmentController } from "./fabric-development.controller";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { FabricRequestEntity } from "./fabric-request.entity";
import { FabricRequestRepository } from "./repository/fabric-request.repository";
import { FabricRequestQualityInfoRepository } from "./repository/fabric-request-quality-info.repository";
import { FabricRequestQualitiesRepository } from "./repository/fabric-request-qualities.repository";
import { FabricRequestItemsRepository } from "./repository/fabric-request-items.repository";
import { FabricRequestQualitiesEntity } from "./fabric-request-qualities.entity";
import { FabricRequestQualitiesInfoEntity } from "./fabric-request-quality-info.entity";
import { FabricRequestItemsEntity } from "./fabric-request-items.entity";
import { FabricDevelopmentService } from "./fabric-development.services";

@Module({
    imports: [
    TypeOrmModule.forFeature([FabricRequestEntity,FabricRequestQualitiesEntity,FabricRequestQualitiesInfoEntity,FabricRequestItemsEntity]),
    ],
    controllers: [FabricDevelopmentController],
    providers: [FabricDevelopmentService,FabricRequestRepository,FabricRequestQualityInfoRepository,FabricRequestQualitiesRepository,FabricRequestItemsRepository,ApplicationExceptionHandler]
  }) 
  export class FabricDevelopmentModule {}