import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { EddieOrdersEntity } from "./entities/eddie-orders.entity";
import { EddieController } from "./eddie.controller";
import { EddieOrdersRepository } from "./repositories/eddie-orders.repo";
import { EddieService } from "./eddie.service";
import { EddiePdfInfoEntity } from "./entities/eddie-pdf.entity";
import { EddiePdfRepo } from "./repositories/eddie-pdf.repo";
import { EddieCOLineRepository } from "./repositories/eddie-co-line.repository";
import { EddieCOLineEntity } from "./entities/eddie-co-line.entity";
import { AddressEntity } from "../Entites@Shahi/address/address-entity";
import { AddressRepository } from "../Entites@Shahi/address/address.repo";
import { EddieChildEntity } from "./entities/eddie-orders-child-entity";
import { EddieOrdersChildRepository } from "./repositories/eddie-orders-child.repo";
import { AddressService } from "../Entites@Shahi/address/address-service";
import { ColorService } from "../Entites@Shahi/color/color-service";
import { ColorRepository } from "../Entites@Shahi/color/color-repo";
import { ColorEntity } from "../Entites@Shahi/color/color-entity";


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
        EddieOrdersEntity,EddiePdfInfoEntity,EddieCOLineEntity,AddressEntity,EddieChildEntity,AddressEntity,ColorEntity
    ])],
  controllers: [EddieController],
  providers: [EddieService,ApplicationExceptionHandler,EddieOrdersRepository,EddiePdfRepo,EddieCOLineRepository,AddressRepository,EddieOrdersChildRepository,AddressRepository,AddressService,ColorService,ColorRepository]
})
export class EddieModule { }