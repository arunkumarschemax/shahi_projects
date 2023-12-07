import { Injectable } from "@nestjs/common";
import { CommonResponseModel, StyleRequest, OperationSequenceModel, OperationSequenceRequest, OperationSequenceResponse, OperationsInfoRequest, OperationInventoryResponseModel, TrackingEnum, OperationTrackingDto, MaterialFabricEnum, TabNameReq, OperationsRequest, LifeCycleStatusEnum, SampleIdRequest } from "@project-management-system/shared-models";
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
import { SampleRequestRepository } from "../sample-dev-request/repo/sample-dev-req-repo";

@Injectable()
export class OperationTrackingService {
    constructor(
        private repo: OperationTrackingRepository,
        private inventoryRepo: OperationInventoryRepository,
        private styleRepo : StyleRepository,
        private materialFabricRepo : MaterialFabricRepository,
        private sampleReqRepo : SampleRequestRepository,
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


      async getOperationInverntory(req?:OperationsRequest): Promise<CommonResponseModel> {

        const data = await this.inventoryRepo.getOperationInventor (req)
        console.log(data,'7777777777777777777777777');
        
        if (data.length > 0) {
            return new CommonResponseModel(true, 1, 'operation data Retrived Sucessfully', data)
        } else {
            return new CommonResponseModel(false, 6546, 'operation data Not Found')

        }
}

    async reportOperation(dto: OperationTrackingDto) : Promise<OperationInventoryResponseModel>{
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
          trackingEntity.nextOperation = dto.nextOperation
          trackingEntity.issuedQuantity = dto.issuedQuantity
          trackingEntity.issuedUomId = dto.issuedUomId
          trackingEntity.sampleReqId = dto.sampleRequestId
          trackingEntity.status = TrackingEnum.YES
          const createLog = await manager.getRepository(OperationTracking).save(trackingEntity)
          // console.log(dto.fabricCode,'*************')
          // const materialFabric = await this.materialFabricRepo.update({fabricCode: dto.fabricCode},{reportedStatus: MaterialFabricEnum.COMPLETED})
          // console.log(materialFabric,'))))))))))))))))))))))')
          if (save && createLog) {
            let sampleReqStatus
            if(dto.operation == 'Cutting'){
              sampleReqStatus = LifeCycleStatusEnum.CUTTING
            }else if(dto.operation == 'Sewing In'){
              sampleReqStatus = LifeCycleStatusEnum.SEWING

            }else if(dto.operation == 'Sewing'){
              sampleReqStatus = LifeCycleStatusEnum.SEWING

            }else if(dto.operation == 'Sewing Out'){
              sampleReqStatus = LifeCycleStatusEnum.SEWING

            }else if(dto.operation == 'Trimming'){
              sampleReqStatus = LifeCycleStatusEnum.CUTTING

            }else if(dto.operation == 'Quality Check'){
              sampleReqStatus = LifeCycleStatusEnum.QUALITY_CONTROL

            }else if(dto.operation == 'Washing'){
              // sampleReqStatus = LifeCycleStatusEnum.CUTTING

            }else if(dto.operation == 'Finishing'){
              sampleReqStatus = LifeCycleStatusEnum.FINISHING

            }else if(dto.operation == 'Packing'){
              sampleReqStatus = LifeCycleStatusEnum.PACKING

            }else if(dto.operation == 'Shipment'){
              sampleReqStatus = LifeCycleStatusEnum.SHIPMENT

            }
            if(dto.nextOperation == 'NA'){
              sampleReqStatus = LifeCycleStatusEnum.READY_TO_DISPATCH
            }

              const SampleReqStatusUpdate = await this.sampleReqRepo.update({SampleRequestId:dto.sampleRequestId},{lifeCycleStatus:sampleReqStatus})
              // `update sample_request set life_cycle_status = '${dto.operation}' where sample_request_id = ${dto.styleId}`
              // const update  = await this.dataSource.query(SampleReqStatusUpdate)
              if(SampleReqStatusUpdate.affected){
                await manager.completeTransaction();
                return new OperationInventoryResponseModel(true, 1111, 'Quantity reported Successfully');
              }else{
                await manager.releaseTransaction();
                throw new ErrorResponse(9999, 'Failed To Update Sample Request');
              }
            } else {
              await manager.releaseTransaction();
              throw new ErrorResponse(9999, 'Failed To Update Operation');
            }
          } catch (error) {
            await manager.releaseTransaction();
            return error;
          }
  }

  async getReportedOperations(req:TabNameReq):Promise<CommonResponseModel>{
    const data = await this.repo.findOne({where:{sampleReqId:req.sampleRequestId,operation:req.tabName}})
    console.log(data,'data')
    const nxtOpData = await this.repo.findOne({where:{sampleReqId:req.sampleRequestId,nextOperation:req.tabName}})
    let opStatus = {
      isReported:'No',
      isNextOpeartion:'No'
    }
    if(data){
      opStatus.isReported = 'Yes'
    }
    if(nxtOpData){
      opStatus.isNextOpeartion = 'Yes'
    }
    if(data || nxtOpData){
      return new CommonResponseModel(true,1,'retrived',opStatus)
    }else{
      return new CommonResponseModel(false,0,'no reportings',opStatus)
    }
    return
  }
   

}
