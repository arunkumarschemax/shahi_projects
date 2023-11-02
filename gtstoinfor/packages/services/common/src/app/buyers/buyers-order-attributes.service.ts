import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Buyers } from "./buyers.entity";
import { BuyersOrderAttributeModel, BuyersOrderAttributeResponseModel } from "@project-management-system/shared-models";
import { Attributes } from "../attributes/attributes.entity";
import { BuyerOrderAttributesEntity } from "./buyers-order.entity";
import { BuyersOrderAttributeDto } from "./dto/buyers-order-attributes.dto";
import { BuyersRequest } from "./dto/buyers.request";

@Injectable()
export class BuyersOrderAttributeService {
    constructor(
        @InjectRepository(BuyerOrderAttributesEntity)
        private buyerOrderAttrRepo: Repository<BuyerOrderAttributesEntity>,
    ){}

    async createOrderAttribute(req:BuyersOrderAttributeDto,isUpdate:boolean ): Promise<BuyersOrderAttributeResponseModel>{
        // console.log(req,"order................")
        try{
            for(const record of req.attributeInfo){
                const entity = new BuyerOrderAttributesEntity()
                const buyer = new Buyers()
                buyer.buyerId = req.buyerId;
                entity.buyerInfo = buyer;
                const attribute = new Attributes()
                attribute.attributeId = record.attributeId
                entity.attributeInfo = attribute
                entity.attributeName = record.attributeName;
                entity.attributeValue = record.attributeValue; 
                if(isUpdate){
                    entity.buyerOrderAttributeId = record.buyerOrderAttributeId;
                    entity.updatedUser = req.updatedUser;
                } else{
                    entity.createdUser = req.createdUser
                }
                const attributeSave = await this.buyerOrderAttrRepo.save(entity)
            }
            return new BuyersOrderAttributeResponseModel(true, 1,'Created Successfully')

        }catch(err){
            return err
        }


    }

    async getBuyerId(req:BuyersRequest) : Promise<BuyersOrderAttributeResponseModel>{
        // console.log(req,'------------------------')
        try{
            let info =[];

            const data = await this.buyerOrderAttrRepo.find({where:{buyerInfo:{buyerId:req.buyerId}},relations:['buyerInfo','attributeInfo']})
            // console.log(data,'------------------------data')
            if(data.length > 0){
                for(const rec of data){
                    info.push(new BuyersOrderAttributeModel(rec.buyerOrderAttributeId,rec.buyerInfo.buyerId,rec.attributeInfo.attributeId,rec.attributeName,rec.attributeValue,rec.isActive,rec.versionFlag))
                }
                return new BuyersOrderAttributeResponseModel(true,1,'Data retrieved',info)
            } else {
                return new BuyersOrderAttributeResponseModel(false,0,'No data found',info)
            }

        }catch(err){
            throw err
        }
    }

    


}


