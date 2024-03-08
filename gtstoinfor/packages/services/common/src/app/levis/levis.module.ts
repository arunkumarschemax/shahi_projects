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
import { SizeService } from "../Entites@Shahi/size/size-service";
import { SizeRepository } from "../Entites@Shahi/size/size-repo";
import { SizeEntity } from "../Entites@Shahi/size/size-entity";
import { LevisOrdersChildRepository } from "./repositories/levis-orders-child.repo";
import { LevisOrderschildEntity } from "./entities/levis-orders-child-entity";
import { EditLevisCOLineEntity } from "./entities/edit-levis-co-line.entity";
import { EditLevisCOLineRepository } from "./repositories/edit-levis-co-line.repository";



@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
        LevisOrdersEntity,LevisPdfInfoEntity,LevisCOLineEntity,AddressEntity,ColorEntity,SizeEntity,LevisOrderschildEntity,EditLevisCOLineEntity
    ])],
  controllers: [LevisController],
  providers: [LevisService,ApplicationExceptionHandler,LevisOrdersRepository,LevisPdfRepo,LevisCOLineRepository,AddressService,AddressRepository,ColorService,ColorRepository,SizeService,SizeRepository,LevisOrdersChildRepository,EditLevisCOLineRepository]
})
export class LevisModule { }