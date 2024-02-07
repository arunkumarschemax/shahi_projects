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



@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
        LevisOrdersEntity,LevisPdfInfoEntity,
    ])],
  controllers: [LevisController],
  providers: [LevisService,ApplicationExceptionHandler,LevisOrdersRepository,LevisPdfRepo]
})
export class LevisModule { }