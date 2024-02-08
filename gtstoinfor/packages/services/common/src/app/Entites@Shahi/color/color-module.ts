import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColorRepository } from "./color.repo";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import {  ColorEntity } from "./color-entity";
import { ColorService } from "./color-service";
import { ColorController } from "./color-controller";

@Module({
    imports: [
      TypeOrmModule.forFeature([ColorEntity])],
    controllers: [ColorController],
    providers: [ColorService,ColorRepository,ApplicationExceptionHandler]
  })
  export class ColorModule { }