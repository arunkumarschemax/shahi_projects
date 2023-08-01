import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BuyerGeneralAttributesEntity } from "./buyers-general.entity";
import { BuyersGeneralAttributeDto } from "./dto/buyers-general-attributes.dto";
import { Buyers } from "./buyers.entity";
import { BuyersGeneralAttributeResponseModel } from "@project-management-system/shared-models";

@Injectable()
export class BuyersGeneralAttributeService {
    constructor(
        @InjectRepository(BuyerGeneralAttributesEntity)
        private buyerGeneralAttrRepo: Repository<BuyerGeneralAttributesEntity>,
    ){}

    async createGeneralAttribute(req:BuyersGeneralAttributeDto ): Promise<BuyersGeneralAttributeResponseModel>{
        try{
            for(const rec of req.attributeInfo){
                const entity = new BuyerGeneralAttributesEntity()
                const buyer = new Buyers()
                buyer.buyerId = req.vendorId;
                entity.buyerInfo = buyer;
                // const attribute = new Attribute()
                // attribute.attributeId = rec.attributeId
                // entity.attributeInfo = attribute
                entity.attributeName = rec.attributeName;
                entity.attributeValue = rec.attributeValue;
                const attributeSave = await this.buyerGeneralAttrRepo.save(entity)
            }
            return new BuyersGeneralAttributeResponseModel(true,1,'Created Successfully')

        }catch(err){
            return err
        }


    }


}