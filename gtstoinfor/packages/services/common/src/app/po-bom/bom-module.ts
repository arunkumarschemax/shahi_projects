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
import { ItemEntity } from "./entittes/item-entity";
import { DpomRepository } from "../dpom/repositories/dpom.repository";
import { DpomEntity } from "../dpom/entites/dpom.entity";
import { TrimService } from "./trim-service";
import { FileUploadEntity } from "./entittes/file-upload-entity";
import { PoBomEntity } from "./entittes/po-bom.entity";
import { ZFactorsEntity } from "./entittes/z-factors.entity";
import { PoBomRepo } from "./repo/po-bom-repo";
import { ZFactorsRepo } from "./repo/z-factors-repo";
import { ItemsRepo } from "./repo/items-repo";
import { ZFactorsBomEntity } from "./entittes/z-factors-bom.entity";
import { DestinationEntity } from "./entittes/destination-entity";
import { DestinationsRepo } from "./repo/destination-repo";
import { ZFactorsBomRepo } from "./repo/z-factors-bom-repo";
import { DpomModule } from "../dpom/nike-dpom.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            StyleEntity, 
            BomEntity,
            StyleComboEntity,ItemEntity,DpomEntity,FileUploadEntity,PoBomEntity,ZFactorsEntity,ZFactorsBomEntity,DestinationEntity
        ]),
        DpomModule],
    controllers:[BomController],
    providers:[StyleRepo,BomRepo,StyleComboRepo,BomService,ApplicationExceptionHandler,DpomRepository,TrimService,PoBomRepo,ZFactorsRepo,ItemsRepo,DestinationsRepo,ZFactorsBomRepo]
})
export class bomModule{ }