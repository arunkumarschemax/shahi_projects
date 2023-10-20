import { Module } from "@nestjs/common";
import { BusinessArea } from "./business-area.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessAreaController } from "./business-area.controller";
import { BusinessAreaService } from "./business-area.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BusinessAreaRepository } from "./business-area.repo";

@Module({
    imports: [
      TypeOrmModule.forFeature([BusinessArea]),
    ],
    controllers: [BusinessAreaController],
    providers: [BusinessAreaService,ApplicationExceptionHandler,BusinessAreaRepository]
  })
  export class BusinessAreaModule {}