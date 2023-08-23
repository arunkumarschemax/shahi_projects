import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Buyers } from "./buyers.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Currencies } from "../currencies/currencies.entity";
import { PaymentTerms } from "../payment-terms/payment-terms.entity";
import { PaymentMethod } from "../payment-methods/payment-method-entity";
import { Address } from "./address.entity";
import { Countries } from "../countries/countries.entity";

@Injectable()
export class BuyerRepository extends Repository<Buyers> {

    constructor(@InjectRepository(Buyers) private buyer: Repository<Buyers>
    ) {
        super(buyer.target, buyer.manager, buyer.queryRunner);
    }

    async getBuyerInfo():Promise<any[]>{
       const data =  await this.createQueryBuilder('b')
       .select(`b.buyer_id,b.buyer_code,b.buyer_name,b.gst_number,b.phone_no,b.contact_person,b.email,b.currency,b.public_note,b.private_note,b.payment_terms_id,b.payment_method_id,b.is_active,b.version_flag,cu.currency_name,paym.payment_method,payter.payment_terms_name,add.address_id,add.country_id,add.state,add.district,add.city,add.landmark,add.lane1,add.lane2,add.pincode,cou.country_name`)
       .leftJoin(Currencies,'cu','cu.currency_id = b.currency')
       .leftJoin(PaymentTerms,'payter','payter.payment_terms_id = b.payment_terms_id')
       .leftJoin(PaymentMethod,'paym','paym.payment_method_id = b.payment_method_id')
       .leftJoin(Address,'add','add.buyer_id = b.buyer_id')
       .leftJoin(Countries,'cou','cou.country_id = add.country_id')
       .orderBy(`b.buyer_name`)
       return data.getRawMany()
    }
}