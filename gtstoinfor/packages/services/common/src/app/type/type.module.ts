import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { Type } from "./type.entity";
import { TypeController } from "./type.controller";
import { TypeService } from "./type.service";
import { TypeRepository } from "./type.repo";



@Module({
    imports: [
      TypeOrmModule.forFeature([Type]),
    ],
    controllers: [TypeController],
    providers: [TypeService,ApplicationExceptionHandler,TypeRepository]
  })
  export class TypeModule {}