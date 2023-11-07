import { CommonResponseModel, RMSkuFilterReq, RmItemTypeEnum, RmSkuModel, RmSkuReq, RmSkuResponseModel } from "@project-management-system/shared-models";
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
            for(const rec of req.features){
                const entity = new RmSkus()
                entity.itemCode = req.itemCode
                entity.itemType = req.itemType
                entity.rmItemId = req.rmItemId
                entity.status = req.status
                // const code = req.itemType === RmItemTypeEnum.FABRIC ? 'FAB' : 'TR'
                const code = req.itemType.slice(0,3)
                entity.featureCode = rec.featureCode
                for(const opdetails of rec.optionsData){
                    len =len +1
                    entity.featureOptionId = opdetails.featureOptionId
                    entity.optionGroup = opdetails.option
                    entity.optionId = opdetails.optionId
                    entity.optionValue = opdetails.optionValue
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

    async getAllRmSKUs(req: RMSkuFilterReq): Promise<CommonResponseModel> {
        try {
            const data = await this.repo.find({
                where:{rmSkuCode: req.skuCode,featureCode:req.featureCode,itemCode: req.itemCode,optionValue: req.optionValue},
                order: { rmSkuId: 'ASC' } 
            });
            if (data.length > 0) {
                return new CommonResponseModel(true, 1, "RM SKU's retrieved successfully", data);
            } else {
                return new CommonResponseModel(false, 0, "No data found", []);
            }
        } catch (err) {
            throw err;
        }
    }

    async getSKUCodeData(): Promise<CommonResponseModel> {
        try {
            const data = await this.repo.getSKUCodeData();
            if (data.length > 0) {
                return new CommonResponseModel(true, 1, "RM SKU's retrieved successfully", data);
            } else {
                return new CommonResponseModel(false, 0, "No data found", []);
            }
        } catch (err) {
            throw err;
        }
    }

    async getFeatureCodeData(): Promise<CommonResponseModel> {
        try {
            const data = await this.repo.getFeatureCodeData();
            if (data.length > 0) {
                return new CommonResponseModel(true, 1, "RM SKU's retrieved successfully", data);
            } else {
                return new CommonResponseModel(false, 0, "No data found", []);
            }
        } catch (err) {
            throw err;
        }
    }

    async getItemCodeData(): Promise<CommonResponseModel> {
        try {
            const data = await this.repo.getItemCodeData();
            if (data.length > 0) {
                return new CommonResponseModel(true, 1, "RM SKU's retrieved successfully", data);
            } else {
                return new CommonResponseModel(false, 0, "No data found", []);
            }
        } catch (err) {
            throw err;
        }
    }

    async getOptionValueData(): Promise<CommonResponseModel> {
        try {
            const data = await this.repo.getOptionValueData();
            if (data.length > 0) {
                return new CommonResponseModel(true, 1, "RM SKU's retrieved successfully", data);
            } else {
                return new CommonResponseModel(false, 0, "No data found", []);
            }
        } catch (err) {
            throw err;
        }
    }
}