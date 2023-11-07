import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Buyers } from "./buyers.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Currencies } from "../currencies/currencies.entity";
import { PaymentTerms } from "../payment-terms/payment-terms.entity";
import { PaymentMethod } from "../payment-methods/payment-method-entity";
import { Address } from "./address.entity";
import { Countries } from "../countries/countries.entity";
import { BuyersSize } from "../buyers-destination/buyers-sizes.entity";
import { BuyersColor } from "../buyers-destination/byers-colors.entity";
import { Destination } from "../destination/destination.entity";
import { Size } from "../sizes/sizes-entity";
import { BuyersDestionations } from "../buyers-destination/buyers-destination.entity";
import { BuyerExtrnalRefIdReq, BuyerIdReq } from "@project-management-system/shared-models";

@Injectable()
export class BuyerRepository extends Repository<Buyers> {

    constructor(@InjectRepository(Buyers) private buyer: Repository<Buyers>
    ) {
        super(buyer.target, buyer.manager, buyer.queryRunner);
    }

    async getBuyerInfo(req?:BuyerExtrnalRefIdReq):Promise<any[]>{
      // console.log('yyyyyyyy');
       
       const data =  await this.createQueryBuilder('b')
       .select(`b.buyer_id,b.buyer_code,b.buyer_name,b.gst_number,b.phone_no,b.contact_person,b.email,b.currency,b.public_note,b.private_note,b.payment_terms_id,b.payment_method_id,b.is_active,b.version_flag,cu.currency_name,paym.payment_method,payter.payment_terms_name,add.address_id,add.country_id,add.state,add.district,add.city,add.landmark,add.lane1,add.lane2,add.pincode,cou.country_name,b.fg_item_code_length,b.rm_item_code_length`)
       .leftJoin(Currencies,'cu','cu.currency_id = b.currency')
       .leftJoin(PaymentTerms,'payter','payter.payment_terms_id = b.payment_terms_id')
       .leftJoin(PaymentMethod,'paym','paym.payment_method_id = b.payment_method_id')
       .leftJoin(Address,'add','add.buyer_id = b.buyer_id')
       .leftJoin(Countries,'cou','cou.country_id = add.country_id')
       if(req.extrnalRefId != undefined){
        data.where(`b.external_ref_number = '${req?.extrnalRefId}'`)
        data.orderBy(`b.buyer_name`)
       }else{
        data.orderBy(`b.buyer_name`)
       }

       return await data.getRawMany()
       
    }

    async getActiveBuyerInfo():Promise<any[]>{
        const data =  await this.createQueryBuilder('b')
        .select(`b.buyer_id,b.buyer_code,b.buyer_name,b.gst_number,b.phone_no,b.contact_person,b.email,b.currency,b.public_note,b.private_note,b.payment_terms_id,b.payment_method_id,b.is_active,b.version_flag,cu.currency_name,paym.payment_method,payter.payment_terms_name,add.address_id,add.country_id,add.state,add.district,add.city,add.landmark,add.lane1,add.lane2,add.pincode,cou.country_name,b.fg_item_code_length,b.rm_item_code_length`)
        .leftJoin(Currencies,'cu','cu.currency_id = b.currency')
        .leftJoin(PaymentTerms,'payter','payter.payment_terms_id = b.payment_terms_id')
        .leftJoin(PaymentMethod,'paym','paym.payment_method_id = b.payment_method_id')
        .leftJoin(Address,'add','add.buyer_id = b.buyer_id')
        .leftJoin(Countries,'cou','cou.country_id = add.country_id')
        .where(`is_active is TRUE`)
        .orderBy(`b.buyer_name`)
        return data.getRawMany()
     }

     async getMappingData():Promise<any[]>{
        const query = this.createQueryBuilder('b')
        .select(`b.buyer_id,b.buyer_name,d.destination_id,d.destination,s.size_id,s.sizes `)
        .leftJoin(BuyersDestionations,'bd','bd.buyer_id = b.buyer_id')
        .leftJoin(BuyersColor,'bc',' bc.buyer_id = b.buyer_id')
        .leftJoin(BuyersSize,'bs','bs.buyer_id = b.buyer_id')
        .leftJoin(Size,'s','s.size_id= bs.size_id')
        .leftJoin(Destination,'d','d.destination_id = bd.destination_id')
        // .leftJoin(Colour,'c','c.colour_id = bc.colour_id')
        // .groupBy(`b.buyer_id`)
        .orderBy(`b.buyer_id`)
        return await query.getRawMany()
    }
}