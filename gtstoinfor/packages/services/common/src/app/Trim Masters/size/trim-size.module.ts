import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { TrimSizeEntity } from "./trim-size-entity";
import { TrimSizeController } from "./trim-size.controller";
import { TrimSizeService } from "./trim-size.service";

@Module({
    imports:[TypeOrmModule.forFeature([TrimSizeEntity])],
    controllers:[TrimSizeController],
    providers:[TrimSizeService,ApplicationExceptionHandler]
})
export class TrimSizeModule{}