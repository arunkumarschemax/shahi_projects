import { Injectable } from "@nestjs/common";
import { OperationSequenceRepository } from "./operation-sequence.repository";
import { OperationSequenceRequest, OperationSequenceResponse } from "@project-management-system/shared-models";
import { OperationSequence } from "./operation-sequence.entity";
import { Item } from "../items/item-entity";
import { OperationGroups } from "../operation-groups/operation-groups.entity";
import { Operations } from "../operations/operation.entity";
import { DataSource, Entity } from "typeorm";
import { GenericTransactionManager } from "../../typeorm-transactions";

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
            const itemCode = await this.repo.find({where:{itemCode:req.itemCode}})
            if(itemCode){
                await transactionalEntityManager.releaseTransaction();
                return  new OperationSequenceResponse(false,0,'Item Code already exist')
            } else{
                for(const rec of req.operatrionsInfo){
                    const entity = new OperationSequence()
                    entity.itemCode = req.itemCode;
                    const item = new Item()
                    item.itemId = req.itemId;
                    entity.itemInfo = item;
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

}