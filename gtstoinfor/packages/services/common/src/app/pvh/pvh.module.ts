import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { PVHOrdersEntity } from "./entities/pvh-orders.entity";
import { PVHController } from "./pvh.controller";
import { PVHService } from "./pvh.service";
import { PVHOrdersRepository } from "./repositories/pvh-orders.repo";
import { GapAddressService } from "../Entites@Shahi/gap-address/gap-address-service";
import { GapAddressRepository } from "../Entites@Shahi/gap-address/gap-address.repo";
import { GapAddressEntity } from "../Entites@Shahi/gap-address/gap-address-entity";


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
        PVHOrdersEntity,
        GapAddressEntity
    ])],
  controllers: [PVHController],
  providers: [PVHService,ApplicationExceptionHandler,PVHOrdersRepository,GapAddressService,GapAddressRepository]
})
export class PVHModule { }