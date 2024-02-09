import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SliderEntity } from "./slider-entity";
import { SliderController } from "./slider.controller";
import { SliderService } from "./slider-service";

@Module({
    imports:[TypeOrmModule.forFeature([SliderEntity])],
    controllers:[SliderController],
    providers:[SliderService,ApplicationExceptionHandler]
})
export class SliderModule{}