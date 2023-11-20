import { Injectable } from "@nestjs/common";
import { CommonResponseModel, StyleRequest, OperationSequenceModel, OperationSequenceRequest, OperationSequenceResponse, OperationsInfoRequest, OperationInventoryResponseModel, TrackingEnum, OperationTrackingDto, MaterialFabricEnum, TabNameReq } from "@project-management-system/shared-models";
import { Item } from "../items/item-entity";
import { OperationGroups } from "../operation-groups/operation-groups.entity";
import { Operations } from "../operations/operation.entity";
import { DataSource, Entity } from "typeorm";
import { OperationTracking } from "./entity/operation-tracking-entity";
import { OperationInventory } from "./entity/operation-inventory-entity";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { Style } from "../style/dto/style-entity";
import { OperationSequence } from "../operation-sequence/operation-sequence.entity";
import { OperationInventoryRepository } from "./repo/operation-inventory-repository";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { StyleRepository } from "../style/dto/style-repo";
import { OperationTrackingRepository } from "./repo/operation-tracking-repository";
import { OperationInvRequest } from "./dto/operation-inventory-req";
import { MaterialFabricRepository } from "../material-issue/repo/material-fabric-repository";

@Injectable()
export class OperationTrackingService {
    constructor(
        private repo: OperationTrackingRepository,
        private inventoryRepo: OperationInventoryRepository,
        private styleRepo : StyleRepository,
        private materialFabricRepo : MaterialFabricRepository,
        private readonly dataSource: DataSource,

    ) { }


    async createOperationReporting(dto: OperationTrackingDto) : Promise<OperationInventoryResponseModel>{
        const manager = new GenericTransactionManager(this.dataSource)
        try{
            console.log(dto,'-------------------------------------------------------------')
            const inventoryEntity = new OperationInventory()
            inventoryEntity.styleId = dto.styleId
            inventoryEntity.operationSequenceId = dto.operationSequenceId
            inventoryEntity.operation = dto.operation
            inventoryEntity.physicalQuantity = dto.physicalQuantity
            inventoryEntity.physicalUom = dto.physicalUom
            inventoryEntity.issuedQuantity = dto.issuedQuantity
            inventoryEntity.issuedUomId = dto.issuedUomId
            inventoryEntity.nextOperation = dto.nextOperation
            // inventoryEntity.materialIssueId = dto.materialIssueId
            await manager.startTransaction();
            const save = await manager.getRepository(OperationInventory).save(inventoryEntity)

            let today = new Date();
            let CurrentYear = today.getFullYear();
            let CurrentMonth = today.getMonth();
            let fromDate = 0;
            let toDate = 0;
            let totalRecords = await (await this.repo.find({ where: { operation: dto.operation } })).length;

            if (CurrentMonth < 4) {
                fromDate = (CurrentYear-1);
                toDate = (CurrentYear);
            } else {
                fromDate = (CurrentYear);
                toDate = (CurrentYear + 1);
            }
            
            totalRecords = totalRecords + 1;
            var refNo = totalRecords + "";
            while (refNo.length < 4) refNo = "0" + refNo;
        
            const operationJobNo = `${dto.operation}` + (fromDate.toString().substr(-2)) + "-" + (toDate.toString().substr(-2)) + "/" + refNo;
            
            const trackingEntity = new OperationTracking()
            trackingEntity.jobNumber = operationJobNo
            trackingEntity.styleId = dto.styleId
            trackingEntity.operationSequenceId = dto.operationSequenceId
            trackingEntity.operationInventoryId = save.operationInventoryId
            trackingEntity.rejectedQuantity = dto.rejectedQuantity
            trackingEntity.rejectedUomId = dto.rejectedUomId
            trackingEntity.reportedQuantity = dto.reportedQuantity
            trackingEntity.reportedUomId = dto.reportedUomId
            trackingEntity.operation = dto.operation
            // trackingEntity.next = dto.nextOperation
            trackingEntity.issuedQuantity = dto.issuedQuantity
            trackingEntity.issuedUomId = dto.issuedUomId
            trackingEntity.status = TrackingEnum.YES
            const createLog = await manager.getRepository(OperationTracking).save(trackingEntity)
            console.log(dto.fabricCode,'*************')
            const materialFabric = await this.materialFabricRepo.update({fabricCode: dto.fabricCode},{reportedStatus: MaterialFabricEnum.COMPLETED})
            console.log(materialFabric,'))))))))))))))))))))))')
            if (save && createLog && materialFabric) {
                await manager.completeTransaction();
                return new OperationInventoryResponseModel(true, 1111, 'Quantity reported Successfully');
              } else {
                await manager.releaseTransaction();
                throw new ErrorResponse(9999, 'Failed To Update Operation');
              }
            } catch (error) {
              await manager.releaseTransaction();
              return error;
            }
    }

    
    async getOperationinventory(req:OperationInvRequest): Promise<OperationInventoryResponseModel> {
        console.log(req,'kkkkkkkkkkkkkkk')
        const data = await this.inventoryRepo.getOperationinventory(req)
    
            return new OperationInventoryResponseModel(true, 1, 'Inventory data Retrived Sucessfully', data)

    }

    async getOperationInventoryData(req: TabNameReq): Promise<CommonResponseModel> {
        const details = await this.inventoryRepo.getOperationInventoryData(req);
        console.log(details,'-----------------')
        if (details.length > 0) {
          return new CommonResponseModel(true, 1, 'data retrieved', details)
        } else {
          return new CommonResponseModel(false, 0, 'data not found')
        }
      }


      async getOperationInverntory(): Promise<CommonResponseModel> {
        const data = await this.inventoryRepo.getOperationInventor ()
        if (data.length > 0) {
            return new CommonResponseModel(true, 1, 'operation data Retrived Sucessfully', data)
        } else {
            return new CommonResponseModel(false, 6546, 'operation data Not Found')

        }
}
   

}
