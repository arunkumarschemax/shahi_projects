import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { GapAddressEntity } from "./gap-address-entity";
import { GapAddressController } from "./gap-address-controller";
import { GapAddressService } from "./gap-address-service";
import { GapAddressRepository } from "./gap-address.repo";

@Module({
    imports: [
      TypeOrmModule.forFeature([GapAddressEntity])],
    controllers: [GapAddressController],
    providers: [GapAddressService,GapAddressRepository,ApplicationExceptionHandler]
  })
  export class GapAddressModule { }