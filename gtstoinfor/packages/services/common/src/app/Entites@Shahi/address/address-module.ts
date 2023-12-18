import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressRepository } from "./address.repo";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { AddressEntity } from "./address-entity";
import { AddressController } from "./address-controller";
import { AddressService } from "./address-service";

@Module({
    imports: [
      TypeOrmModule.forFeature([AddressEntity])],
    controllers: [AddressController],
    providers: [AddressService,AddressRepository,ApplicationExceptionHandler]
  })
  export class AddressModule { }