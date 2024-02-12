import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CentricEntity } from "./entity/centric.entity";
import { CentricController } from "./centric.controller";
import { CentricService } from "./centric.service";
import { CentricRepository } from "./repositories/centric.repo";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { CentricPdfFileUploadEntity } from "./entity/centric-pdf-file.entity";
import { CentricPdfRepository } from "./repositories/pdf-repo";
import { CentricCOLineEntity } from "./entity/centric-co-line.entity";
import { CentricCOLineRepository } from "./repositories/centric-co-line.repository";
import { AddressService } from "../Entites@Shahi/address/address-service";
import { AddressRepository } from "../Entites@Shahi/address/address.repo";
import { AddressEntity } from "../Entites@Shahi/address/address-entity";
import { CentricChildEntity } from "./entity/centric-child.entity";
import { CentricOrdersChildRepository } from "./repositories/centric-child.repo";
import { ColorEntity } from "../Entites@Shahi/color/color-entity";
import { ColorRepository } from "../Entites@Shahi/color/color-repo";
import { ColorService } from "../Entites@Shahi/color/color-service";


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      CentricEntity, CentricPdfFileUploadEntity, CentricCOLineEntity, AddressEntity,CentricChildEntity,ColorEntity
    ])],
  controllers: [CentricController],
  providers: [CentricService, CentricRepository, ApplicationExceptionHandler, CentricPdfRepository, CentricCOLineRepository, AddressRepository, AddressService,CentricOrdersChildRepository,ColorRepository,ColorService]
})
export class CentricModule { }
