import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import {  ColorEntity } from "./color-entity";
import { ColorService } from "./color-service";
import { ColorController } from "./color-controller";
import { ColorRepository } from "./color-repo";

@Module({
    imports: [
      TypeOrmModule.forFeature([ColorEntity])],
    controllers: [ColorController],
    providers: [ColorService,ColorRepository,ApplicationExceptionHandler]
  })
  export class ColorModule { }