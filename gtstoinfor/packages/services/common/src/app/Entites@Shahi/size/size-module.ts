import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SizeEntity } from "./size-entity";
import { SizeController } from "./size-controller";
import { SizeService } from "./size-service";
import { SizeRepository } from "./size-repo";

@Module({
    imports: [
      TypeOrmModule.forFeature([SizeEntity])],
    controllers: [SizeController],
    providers: [SizeService,SizeRepository,ApplicationExceptionHandler]
  })
  export class SizeModule { }