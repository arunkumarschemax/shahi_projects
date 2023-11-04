import { Injectable } from "@nestjs/common";
import { CommonResponseModel, StyleRequest, OperationSequenceModel, OperationSequenceRequest, OperationSequenceResponse, OperationsInfoRequest, OperationTrackingResponseModel, OperationInventoryDto, OperationInventoryResponseModel, OperationsRequest } from "@project-management-system/shared-models";
import { Item } from "../items/item-entity";
import { OperationGroups } from "../operation-groups/operation-groups.entity";
import { Operations } from "../operations/operation.entity";
import { DataSource, Entity } from "typeorm";
import { OperationTracking } from "./entity/operation-tracking-entity";
import { OperationInventory } from "./entity/operation-inventory-entity";
import { OperationInvRequest } from "./dto/operation-inventory-req";
import { OperationInventoryRepository } from "./repo/operation-inventory-repository";

@Injectable()
export class OperationTrackingService {
    constructor(
        private repo: OperationInventoryRepository,
        private readonly dataSource: DataSource,

    ) { }

    async getOperationinventory(req:OperationInvRequest): Promise<OperationInventoryResponseModel> {
        console.log(req,'kkkkkkkkkkkkkkk')
        const data = await this.repo.getOperationinventory(req)
    
            return new OperationInventoryResponseModel(true, 1, 'Inventory data Retrived Sucessfully', data)

    }

}

