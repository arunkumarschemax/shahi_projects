import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BomController } from "./bom-controller";
import { BomService } from "./bom-service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleEntity } from "./entittes/style-entity";
import { BomEntity } from "./entittes/bom-entity";
import { StyleComboEntity } from "./entittes/style-combo-entity";
import { StyleRepo } from "./dto/style-repo";
import { BomRepo } from "./dto/bom-repo";
import { StyleComboRepo } from "./dto/style-combo-repo";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            StyleEntity, 
            BomEntity,
            StyleComboEntity
        ])],
    controllers:[BomController],
    providers:[StyleRepo,BomRepo,StyleComboRepo,BomService,ApplicationExceptionHandler]
})
export class bomModule{ }