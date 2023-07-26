import { Module } from "@nestjs/common";
import { SupplierController } from "./supplier.controller";
import { SupplierService } from "./supplier.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SupplierRepository } from "./repository/supplier.repository";
import { SupplierAdapter } from "./adapters/adapters/supplier.adapter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierEntity } from "./supplier.entity";


@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity, SupplierRepository])],
  controllers: [SupplierController],
  providers: [SupplierService, ApplicationExceptionHandler, SupplierRepository, SupplierAdapter],
  exports: [SupplierService]
})
export class SupplierModule { }