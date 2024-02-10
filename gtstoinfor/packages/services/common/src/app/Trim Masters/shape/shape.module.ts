import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ShapeEntity } from "./shape-entity";
import { ShapeController } from "./shape.controller";
import { ShapeService } from "./shape-service";

@Module({
    imports:[TypeOrmModule.forFeature([ShapeEntity])],
    controllers:[ShapeController],
    providers:[ShapeService,ApplicationExceptionHandler]
})
export class ShapeModule{}