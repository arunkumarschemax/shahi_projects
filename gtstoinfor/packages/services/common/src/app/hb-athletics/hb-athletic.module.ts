import { Module } from "@nestjs/common";
import { HbOrdersEntity } from "./entity/hb-orders.entity";
import { AddressEntity } from "../Entites@Shahi/address/address-entity";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { AddressService } from "../Entites@Shahi/address/address-service";
import { AddressRepository } from "../Entites@Shahi/address/address.repo";
import { HbService } from "./hb-athletic.service";
import { HbOrdersRepository } from "./repositories/hb-orders.repo";
import { HbController } from "./hb-athletic.controller";
import { HbPdfRepo } from "./repositories/hb-pdf.repo";
import { HbPdfFileInfoEntity } from "./entity/hb-pdf.entity";
import { HbCOLineRepository } from "./repositories/hb-co-line.repository";
import { HbCOLineEntity } from "./entity/hb-co-line.entity";



@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
     AddressEntity,HbOrdersEntity,HbPdfFileInfoEntity,HbCOLineEntity
    ])],
  controllers: [HbController],
  providers: [AddressRepository, AddressService, HbService, HbOrdersRepository, ApplicationExceptionHandler, HbPdfRepo, HbCOLineRepository]
})
export class HbModule { }
