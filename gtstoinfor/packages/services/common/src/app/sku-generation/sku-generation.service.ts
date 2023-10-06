import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemSkus } from "./sku-generation.entity";
import { Repository } from "typeorm";
import { CommonResponseModel, ItemSKusReq, SKUGenerationResponseModel } from "@project-management-system/shared-models";

@Injectable()
export class ItemSkuService{
    constructor(
        @InjectRepository(ItemSkus)
        private itemSkuRepo: Repository<ItemSkus>,
      ){}

    //   async createItemSku(req:ItemSKusReq):Promise<SKUGenerationResponseModel>{
    //     try{
    //         const 

    //     } catch(err){
    //         throw err
    //     }
    //   }
}