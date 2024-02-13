import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { LevisOrdersEntity } from "./entities/levis-orders.entity";
import { LevisPdfInfoEntity } from "./entities/levis-pdf.entity";
import { LevisController } from "./levis.controller";
import { LevisService } from "./levis.service";
import { LevisOrdersRepository } from "./repositories/levis-orders.repo";
import { LevisPdfRepo } from "./repositories/levis-pdf.repo";
import { LevisCOLineRepository } from "./repositories/levis-co-line.repository";
import { LevisCOLineEntity } from "./entities/levis-co-line.entity";
import { AddressService } from "../Entites@Shahi/address/address-service";
import { AddressRepository } from "../Entites@Shahi/address/address.repo";
import { AddressEntity } from "../Entites@Shahi/address/address-entity";
import { ColorService } from "../Entites@Shahi/color/color-service";
import { ColorRepository } from "../Entites@Shahi/color/color-repo";
import { ColorEntity } from "../Entites@Shahi/color/color-entity";



@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
        LevisOrdersEntity,LevisPdfInfoEntity,LevisCOLineEntity,AddressEntity,ColorEntity
    ])],
  controllers: [LevisController],
  providers: [LevisService,ApplicationExceptionHandler,LevisOrdersRepository,LevisPdfRepo,LevisCOLineRepository,AddressService,AddressRepository,ColorService,ColorRepository]
})
export class LevisModule { }