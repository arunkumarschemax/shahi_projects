import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CoTypes } from "./co-type.entity";
import { CoTypeController } from "./co-type.controller";
import { CoTypeRepository } from "./co-type.repo";
import { CoTypeService } from "./co-type.service";

@Module({
    imports: [
      TypeOrmModule.forFeature([CoTypes]),
    ],
    controllers: [CoTypeController],
    providers: [CoTypeService,ApplicationExceptionHandler,CoTypeRepository]
  })
  export class CoTypeModule {}