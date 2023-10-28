import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { RmSkus } from "./rm-sku.entity";
import { RmSkusController } from "./rm-skus.controller";
import { RmSkusService } from "./rm-skus.service";
import { RmSKusRepository } from "./rm-sku.repo";

@Module({
    imports: [
      TypeOrmModule.forFeature([RmSkus]),
    ],
    controllers: [RmSkusController],
    providers: [RmSkusService,ApplicationExceptionHandler,RmSKusRepository]
  })
  export class RmSkusModule {}