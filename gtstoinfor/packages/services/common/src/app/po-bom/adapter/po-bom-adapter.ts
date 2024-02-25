import { BomDataForStyleAndSeasonModel } from "@project-management-system/shared-models";
import { PoBomEntity } from "../entittes/po-bom.entity";
import { BomEntity } from "../entittes/bom-entity";

function mapBomDataToPoBomEntity(bomData: BomDataForStyleAndSeasonModel): PoBomEntity {
    const poBomEntity = new PoBomEntity();

    // Map properties from BomDataForStyleAndSeasonModel to PoBomEntity
    const bom = new BomEntity()
    bom.id = bomData.bomId
    poBomEntity.bom = bom

    return poBomEntity;
}