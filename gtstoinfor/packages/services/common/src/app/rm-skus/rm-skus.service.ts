import { RmItemTypeEnum, RmSkuModel, RmSkuReq, RmSkuResponseModel } from "@project-management-system/shared-models";
import { RmSkus } from "./rm-sku.entity";


import { Injectable } from "@nestjs/common";
import { RmSKusRepository } from "./rm-sku.repo";
import { DataSource } from "typeorm";
import { GenericTransactionManager } from "../../typeorm-transactions";

@Injectable()
export class RmSkusService {
    constructor(
        private repo : RmSKusRepository,
        private readonly dataSource: DataSource,

    ) { }

    async createRmSkus(req:RmSkuReq):Promise<RmSkuResponseModel>{
        const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
        try{
            await transactionalEntityManager.startTransaction();
            let flag = []
            let len = 0;
            const entity = new RmSkus()
            entity.itemCode = req.itemCode
            entity.itemType = req.itemType
            entity.rmItemId = req.rmItemId
            entity.status = req.status
            for(const rec of req.features){
                len =len +1
                const code = req.itemType === RmItemTypeEnum.FABRIC ? 'FAB' : 'TR'
                entity.featureCode = rec.featureCode
                if(rec.rmSkuId){
                    entity.rmSkuId = rec.rmSkuId
                    entity.rmSkuCode = rec.rmSkuCode
                    entity.updatedUser = req.createdUser
                } else{
                    entity.rmSkuId = null
                    entity.rmSkuCode = `RM/${code}/00${len}`
                    entity.createdUser = req.createdUser
                }
                const save = await this.repo.save(entity)
                if(!save){
                    flag.push(false)
                    await transactionalEntityManager.releaseTransaction()
                    return new RmSkuResponseModel(false,0,'Something went wrong ',[])
                } else{
                    flag.push(true)
                }
            }
            if(flag.includes(false)){
                await transactionalEntityManager.releaseTransaction()
                return new RmSkuResponseModel(false,0,'Something went wrong ',[])
            }else{
                await transactionalEntityManager.completeTransaction()
                return new RmSkuResponseModel(true,1,'Created successfully',[])
            }

        }catch(err){
            throw err
        }

    }

    async getAllRmSKUs(): Promise<RmSkuResponseModel> {
        try {
            const data = await this.repo.find({ order: { rmSkuCode: 'ASC' } });
    
            const rmSkuModels = data.map((rmSku) => {
                return new RmSkuModel(rmSku.rmItemId,rmSku.itemType,[],rmSku.status,rmSku.itemCode);
            });
    
            if (rmSkuModels.length > 0) {
                return new RmSkuResponseModel(true, 1, "RM SKU's retrieved successfully", rmSkuModels);
            } else {
                return new RmSkuResponseModel(false, 0, "No data found", []);
            }
        } catch (err) {
            throw err;
        }
    }
}