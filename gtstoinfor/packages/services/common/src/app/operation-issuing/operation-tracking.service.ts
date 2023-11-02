import { Injectable } from "@nestjs/common";
import { CommonResponseModel, StyleRequest, OperationSequenceModel, OperationSequenceRequest, OperationSequenceResponse, OperationsInfoRequest } from "@project-management-system/shared-models";
import { Item } from "../items/item-entity";
import { OperationGroups } from "../operation-groups/operation-groups.entity";
import { Operations } from "../operations/operation.entity";
import { DataSource, Entity } from "typeorm";
import { OperationTrackingRepository } from "./repo/operation-tracking-repository";

@Injectable()
export class OperationTrackingService{
    constructor(
        private repo: OperationTrackingRepository,
        private readonly dataSource: DataSource,
        
    ){}

}