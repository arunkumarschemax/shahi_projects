import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LineEntity } from "./line-entity";
import { LineController } from "./line-controller";
import { LineService } from "./line.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";

@Module({
    imports:[TypeOrmModule.forFeature([LineEntity])],
    controllers:[LineController],
    providers:[LineService,ApplicationExceptionHandler]
})
export class LineModule{}