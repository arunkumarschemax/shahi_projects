import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ThreadQtyEntity } from "./thread-qty.entity";
import { ThreadQtyController } from "./thread-qty.controller";
import { SupplierService } from "../supplier/supplier.service";
import { ThreadQtyService } from "./thread-qty.service";
import { ThreadQtyRepo } from "./thread-qty.repo";



@Module({
  imports: [TypeOrmModule.forFeature([ThreadQtyEntity])],
  controllers: [ThreadQtyController],
  providers: [ThreadQtyService, ApplicationExceptionHandler,ThreadQtyRepo],
  exports: [ThreadQtyService]
})
export class ThreadQtyModule { }