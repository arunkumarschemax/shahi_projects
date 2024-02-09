import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { TrimBuyerEntity } from "./trim-buyer-entity";
import { TrimBuyerController } from "./trim-buyer.controller";
import { TrimBuyerService } from "./trim-buyer-service";

@Module({
    imports:[TypeOrmModule.forFeature([TrimBuyerEntity])],
    controllers:[TrimBuyerController],
    providers:[TrimBuyerService,ApplicationExceptionHandler]
})
export class TrimBuyerModule{}