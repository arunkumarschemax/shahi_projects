import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ThreadSupplierEntity } from "./thread-supplier.entity";
import { ThreadSupplierController } from "./thread-supplier.controller";
import { ThreadSupplierRepo } from "./thread-supplier.repo";
import { ThreadSupplierService } from "./thread-supplier.service";



@Module({
  imports: [TypeOrmModule.forFeature([ThreadSupplierEntity])],
  controllers: [ThreadSupplierController],
  providers: [ThreadSupplierService, ApplicationExceptionHandler,ThreadSupplierRepo],
  exports: [ThreadSupplierService]
})
export class ThreadSupplierModule { }