import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { PVHOrdersEntity } from "./entities/pvh-orders.entity";
import { PVHController } from "./pvh.controller";
import { PVHService } from "./pvh.service";
import { PVHOrdersRepository } from "./repositories/pvh-orders.repo";


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
        PVHOrdersEntity
    ])],
  controllers: [PVHController],
  providers: [PVHService,ApplicationExceptionHandler,PVHOrdersRepository]
})
export class PVHModule { }