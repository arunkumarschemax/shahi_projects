import { Injectable } from "@nestjs/common";
import { OperationSequenceRepository } from "./operation-sequence.repository";
import { CommonResponseModel, StyleRequest, OperationSequenceModel, OperationSequenceRequest, OperationSequenceResponse, OperationsInfoRequest } from "@project-management-system/shared-models";
import { OperationSequence } from "./operation-sequence.entity";
import { Item } from "../items/item-entity";
import { OperationGroups } from "../operation-groups/operation-groups.entity";
import { Operations } from "../operations/operation.entity";
import { DataSource, Entity } from "typeorm";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { Style } from "../style/dto/style-entity";

@Injectable()
export class OperationSequenceService{
    constructor(
        private repo: OperationSequenceRepository,
        private readonly dataSource: DataSource,
        
    ){}

    async createOperationSequence(req:OperationSequenceRequest):Promise<OperationSequenceResponse>{
        const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
        try{
            await transactionalEntityManager.startTransaction();
            let statusFlag = []
            const itemCode = await this.repo.find({where:{style:req.style}})
            if(itemCode.length >0){
                await transactionalEntityManager.releaseTransaction();
                return  new OperationSequenceResponse(false,0,'Style already exist')
            } else{
                for(const rec of req.operatrionsInfo){
                    const entity = new OperationSequence()
                    entity.style = req.style;
                    // const item = new Item()
                    // item.itemId = req.itemId;
                    const styleInfo = new Style()
                    styleInfo.styleId = req.styleId
                    entity.styleInfo = styleInfo;
                    const operationGroup = new OperationGroups()
                    operationGroup.operationGroupId = rec.operationGroupId
                    entity.operationGroupName = rec.operationGroupName
                    entity.operationGroupInfo = operationGroup;
                    const operation = new Operations()
                    operation.operationId = rec.operationId;
                    entity.operationName = rec.operationName;
                    entity.operationsInfo = operation;
                    entity.sequence = rec.sequence;
                    const save = await this.repo.save(entity)
                    if(save){
                        statusFlag.push(true)
                    } else{
                        statusFlag.push(false)
                        break
                    }
                }
                if(!(statusFlag.includes(false))){
                    await transactionalEntityManager.completeTransaction();
                    return new OperationSequenceResponse(true,1,'Created successfully',)
                } else{
                    await transactionalEntityManager.releaseTransaction();
                    return  new OperationSequenceResponse(false,0,'Something went wrong')
                }
            }

        }catch(err){
            throw err
        }

    }

    async getInfoByStyleCode(req:StyleRequest):Promise<CommonResponseModel>{
        try{
            const info = await this.repo.find({where:{style:req.style}})
            if(info.length > 0){
                return new CommonResponseModel(true,1,'Data retrieved',info)
            } else{
                return new CommonResponseModel(false,0,'No data found')
            }

        }catch(err){
            throw err
        }

    }

    async getOperationSequenceInfo():Promise<OperationSequenceResponse>{
        try{
            const info = await this.repo.find({relations:['styleInfo','operationsInfo','operationGroupInfo']})
            const operationSequenceMap = new Map<string,OperationSequenceModel>()
            if(info.length > 0){
                for(const rec of info){
                    if(!operationSequenceMap.has(rec.style)){
                        operationSequenceMap.set(rec.style,new OperationSequenceModel(rec.operationSequenceId,rec.style,rec.styleInfo.styleId,rec.styleInfo.description,[]))
                    }
                    operationSequenceMap.get(rec.style).operatrionsInfo.push(new OperationsInfoRequest(rec.operationGroupName,rec.operationGroupInfo.operationGroupId,rec.operationName,rec.operationsInfo.operationId,rec.sequence))
                }
                const operationSequenceModel : OperationSequenceModel[] = [];
                operationSequenceMap.forEach((os => operationSequenceModel.push(os)))
                return new OperationSequenceResponse(true,1,'Data retrieved',operationSequenceModel)
            } else{
                return new OperationSequenceResponse(false,0,'No data found')
            }

        }catch(err){
            throw err
        }
    }

    async getOperationSequenceInfoByStyleCode(req:StyleRequest):Promise<OperationSequenceResponse>{
        console.log(req)
        try{
            const info = await this.repo.find({relations:['styleInfo','operationsInfo','operationGroupInfo'],where:{styleInfo:{styleId:req.styleId}}})
            const operationSequenceMap = new Map<string,OperationSequenceModel>()
            if(info.length > 0){
                for(const rec of info){
                    if(!operationSequenceMap.has(rec.style)){
                        operationSequenceMap.set(rec.style,new OperationSequenceModel(rec.operationSequenceId,rec.style,rec.styleInfo.styleId,rec.styleInfo.description,[]))
                    }
                    operationSequenceMap.get(rec.style).operatrionsInfo.push(new OperationsInfoRequest(rec.operationGroupName,rec.operationGroupInfo.operationGroupId,rec.operationName,rec.operationsInfo.operationId,rec.sequence))
                }
                const operationSequenceModel : OperationSequenceModel[] = [];
                operationSequenceMap.forEach((os => operationSequenceModel.push(os)))
                return new OperationSequenceResponse(true,1,'Data retrieved',operationSequenceModel)
            } else{
                return new OperationSequenceResponse(false,0,'No data found')
            }

        }catch(err){
            throw err
        }
    }

}