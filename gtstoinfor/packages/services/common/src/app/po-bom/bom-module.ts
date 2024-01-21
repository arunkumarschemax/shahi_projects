import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BomController } from "./bom-controller";
import { BomService } from "./bom-service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleEntity } from "./entittes/style-entity";
import { BomEntity } from "./entittes/bom-entity";
import { StyleComboEntity } from "./entittes/style-combo-entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            StyleEntity, 
            BomEntity,
            StyleComboEntity
        ])],
    controllers:[BomController],
    providers:[BomService,ApplicationExceptionHandler]
})
export class bomModule{ }