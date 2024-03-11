import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CkAddressController } from "./ck-address-controller";
import { CkAddressEntity } from "./ck-address-entity";
import { CkAddressService } from "./ck-address-service";
import { CkAddressRepository } from "./ck-address.repo";


@Module({
    imports: [
      TypeOrmModule.forFeature([CkAddressEntity])],
    controllers: [CkAddressController],
    providers: [CkAddressService,CkAddressRepository,ApplicationExceptionHandler]
  })
  export class CkAddressModule { }