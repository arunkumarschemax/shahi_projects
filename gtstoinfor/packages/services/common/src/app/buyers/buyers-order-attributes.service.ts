import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Buyers } from "./buyers.entity";
import { BuyersOrderAttributeResponseModel } from "@project-management-system/shared-models";
import { Attributes } from "../attributes/attributes.entity";
import { BuyerOrderAttributesEntity } from "./buyers-order.entity";
import { BuyersOrderAttributeDto } from "./dto/buyers-order-attributes.dto";

@Injectable()
export class BuyersOrderAttributeService {
    constructor(
        @InjectRepository(BuyerOrderAttributesEntity)
        private buyerOrderAttrRepo: Repository<BuyerOrderAttributesEntity>,
    ){}

    async createOrderAttribute(req:BuyersOrderAttributeDto ): Promise<BuyersOrderAttributeResponseModel>{
        console.log(req,"order................")
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
                const attributeSave = await this.buyerOrderAttrRepo.save(entity)
            }
            return new BuyersOrderAttributeResponseModel(true, 1,'Created Successfully')

        }catch(err){
            return err
        }


    }

    


}