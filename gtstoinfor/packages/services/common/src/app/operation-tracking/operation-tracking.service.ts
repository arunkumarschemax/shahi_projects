import { Injectable } from "@nestjs/common";
import { CommonResponseModel, StyleRequest, OperationSequenceModel, OperationSequenceRequest, OperationSequenceResponse, OperationsInfoRequest, OperationTrackingResponseModel } from "@project-management-system/shared-models";
import { Item } from "../items/item-entity";
import { OperationGroups } from "../operation-groups/operation-groups.entity";
import { Operations } from "../operations/operation.entity";
import { DataSource, Entity } from "typeorm";
import { OperationTrackingRepository } from "./repo/operation-tracking-repository";
import { OperationTracking } from "./entity/operation-tracking-entity";
import { OperationInventory } from "./entity/operation-inventory-entity";

@Injectable()
export class OperationTrackingService{
    constructor(
        private repo: OperationTrackingRepository,
        private readonly dataSource: DataSource,
        
    ){}


    async createOperationIssuing() : Promise<OperationTrackingResponseModel>{
        try{
            const trackingEntity = new OperationTracking()
            const inventoryEntity = new OperationInventory()
            // trackingEntity.jobNumber = 
            return
        } catch (err) {
            throw err;
        }
    }
}