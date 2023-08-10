import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BuyerGeneralAttributesEntity } from "./buyers-general.entity";
import { BuyersGeneralAttributeDto } from "./dto/buyers-general-attributes.dto";
import { Buyers } from "./buyers.entity";
import { BuyersGeneralAttributeModel, BuyersGeneralAttributeResponseModel } from "@project-management-system/shared-models";
import { Attributes } from "../attributes/attributes.entity";
import { BuyersRequest } from "./dto/buyers.request";

@Injectable()
export class BuyersGeneralAttributeService {
    constructor(
        @InjectRepository(BuyerGeneralAttributesEntity)
        private buyerGeneralAttrRepo: Repository<BuyerGeneralAttributesEntity>,
    ){}

    async createGeneralAttribute(req:BuyersGeneralAttributeDto,isUpdate:boolean ): Promise<BuyersGeneralAttributeResponseModel>{
        try{
            for(const rec of req.attributeInfo){
                const entity = new BuyerGeneralAttributesEntity()
                const buyer = new Buyers()
                buyer.buyerId = req.buyerId;
                entity.buyerInfo = buyer;
                const attribute = new Attributes()
                attribute.attributeId = rec.attributeId
                entity.attributeInfo = attribute
                entity.attributeName = rec.attributeName;
                entity.attributeValue = rec.attributeValue;
                if(isUpdate){
                    entity.buyerGeneralAttributeId = rec.buyerGeneralAttributeId;
                    entity.updatedUser = req.updatedUser;
                } else{
                    entity.createdUser = req.createdUser
                }
                const attributeSave = await this.buyerGeneralAttrRepo.save(entity)
            }
            return new BuyersGeneralAttributeResponseModel(true,1,'Created Successfully')
        }catch(err){
            return err
        }
    }

    async getByBuyerId(req:BuyersRequest) : Promise<BuyersGeneralAttributeResponseModel>{
        try{
            let info =[];

            const data = await this.buyerGeneralAttrRepo.find({where:{buyerInfo:{buyerId:req.buyerId}},relations:['buyerInfo','attributeInfo']})
            if(data.length > 0){
                for(const rec of data){
                    info.push(new BuyersGeneralAttributeModel(rec.buyerGeneralAttributeId,rec.buyerInfo.buyerId,rec.attributeInfo.attributeId,rec.attributeName,rec.attributeValue,rec.isActive,rec.versionFlag))
                }
                return new BuyersGeneralAttributeResponseModel(true,1,'Data retrieved',info)
            } else {
                return new BuyersGeneralAttributeResponseModel(false,0,'No data found',info)
            }

        }catch(err){
            throw err
        }
    }


}