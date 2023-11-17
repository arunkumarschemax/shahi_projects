import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StyleOrder } from "./style-order.entity";
import { StyleOrderIdReq, styleOrderReq } from "@project-management-system/shared-models";
import { OrderLine } from "./order-line.entity";
import { Buyers } from "../buyers/buyers.entity";
import { FactoriesEntity } from "../factories/factories.entity";
import { Warehouse } from "../warehouse/warehouse.entity";
import { EmplyeeDetails } from "../employee-details/dto/employee-details-entity";
import { Address } from "../buyers/address.entity";
import { PackageTerms } from "../packages-terms/package-terms.entity";
import { DeliveryTerms } from "../delivery-terms/delivery-terms.entity";
import { DeliveryMethod } from "../delivery-method/delivery-method.entity";
import { Currencies } from "../currencies/currencies.entity";
import { PaymentMethod } from "../payment-methods/payment-method-entity";
import { PaymentTerms } from "../payment-terms/payment-terms.entity";
import { ItemCreation } from "../fg-item/item_creation.entity";
import { UomEntity } from "../uom/uom-entity";
import { CoTypes } from "../co-type/co-type.entity";
import { StyleOrderColineIdReq } from "./style-order.colineId.request";
import { StyleOrderId } from "./style-order-id.request";
import { CoLine } from "./co-line.entity";

@Injectable()
export class StyleOrderRepository extends Repository<StyleOrder> {

    constructor(@InjectRepository(StyleOrder) private styleorderRepo: Repository<StyleOrder>
    ) {
        super(styleorderRepo.target, styleorderRepo.manager, styleorderRepo.queryRunner);
    }

    async getAllCOCount(): Promise<any> {
        const query =  this.createQueryBuilder('co')
            .select(`MAX(co_id) as id `)
            .orderBy(`created_at`, 'DESC')
        return await query.getRawOne()

    }
    
    async getAllStyleOrders(req: styleOrderReq):Promise<any>{
        
        const query = await this.createQueryBuilder('co')
        .select(`item_code,co.order_number,agent,discount_amount,discount_per,discount_per,f.name,f.name AS factory,wh.warehouse_name,cu.currency_name,order_date,instore_date,co.sale_price,buyer_po_number,shipment_type,buyer_style,ct.co_type,b.buyer_name,price_quantity,SUM(c.order_quantity)AS qty,co.co_id,co.fg_item_id,co.status,payter.payment_terms_name,payme.payment_method,delimet.delivery_method,pacter.package_terms_name,delter.delivery_terms_name`)
        .leftJoin(OrderLine,'c','c.co_id = co.co_id ')
        .leftJoin(Buyers,'b','b.buyer_id = co.buyer_id ')
        .leftJoin(FactoriesEntity,'f','f.id = co.facility_id ')
        .leftJoin(Warehouse,'wh','wh.warehouse_id = co.warehouse_id ')
        .leftJoin(Currencies,'cu','cu.currency_id = co.currency_id ')
        .leftJoin(CoTypes,'ct','ct.co_type_id = co.currency_id ')
        .leftJoin(PackageTerms,'pacter',`pacter.package_terms_id = co.package_terms_id`)
        .leftJoin(DeliveryTerms,'delter','delter.delivery_terms_id = co.delivery_terms_id')
        .leftJoin(DeliveryMethod,'delimet','delimet.delivery_method_id = co.delivery_method_id')
        .leftJoin(PaymentMethod,'payme','payme.payment_method_id = co.Payment_method_id')
        .leftJoin(PaymentTerms,'payter','payter.payment_terms_id = co.Payment_terms_id')
         .where(`co.fg_item_id =${req.itemId}`)
         if (req?.coId !== undefined) {
            query.andWhere(`co.co_id ='${req.coId}'`)
        }
        if (req?.buyerId !== undefined) {
            query.andWhere(`co.buyer_id ='${req.buyerId}'`)
        }
        query.groupBy(`co.order_number , c.co_id`)
        return query.getRawMany()
    }

    async getInfoById(req:StyleOrderIdReq):Promise<any>{
        const query = await this.createQueryBuilder('co')
        .select(`co.co_id,co.order_number,co.item_code,co.buyer_id,bu.buyer_name,bu.buyer_code,co.facility_id,fa.name as factoryName,co.warehouse_id,w.warehouse_name,co.remarks,co.buyer_po_number,co.order_date,co.shipment_type,co.buyer_style,co.agent,emp.first_name AS agentName,emp.employee_code as AgentCode,co.buyer_address,add.landmark as buyerLandmark,add.city as buyerCity,add.state as buyerState,co.package_terms_id,pacter.package_terms_name,co.delivery_terms_id,delter.delivery_terms_name,co.delivery_method_id,delimet.delivery_method,co.instore_date,co.sale_price,co.currency_id,cu.currency_name,co.price_quantity,co.discount_per,co.discount_amount,payter.payment_terms_name,payme.payment_method,co.Payment_method_id,co.Payment_terms_id,co.fg_item_id,fgi.item_name,col.order_line_id as coLineId,delad.landmark as delLandmark,delad.city as delCity,delad.state as delState,col.order_quantity,col.color,col.size,col.destination,col.uom,col.delivery_address,col.color_id,col.size_id,col.destination_id,col.uom_id,col.sku_code,co.merchandiser,mer.first_name as merchandiserName,mer.employee_code as merchandiserCode,co.planner,pla.first_name as plannerName,pla.employee_code as plannerCode,co.quantity_uom_id as uomId,uom.uom,co.co_type_id as coTypeId,cotype.co_type as coType,co.item_sale_price_qty,col.sale_price as SalePrice`)
        .leftJoin(Buyers,'bu',`bu.buyer_id = co.buyer_id`)
        .leftJoin(FactoriesEntity,'fa',`fa.id = co.facility_id`)
        .leftJoin(Warehouse,'w',`w.warehouse_id = co.warehouse_id`)
        .leftJoin(EmplyeeDetails,'emp',`emp.employee_id = co.agent`)
        .leftJoin(Address,'add',`add.address_id = co.buyer_address`)
        .leftJoin(PackageTerms,'pacter',`pacter.package_terms_id = co.package_terms_id`)
        .leftJoin(DeliveryTerms,'delter','delter.delivery_terms_id = co.delivery_terms_id')
        .leftJoin(DeliveryMethod,'delimet','delimet.delivery_method_id = co.delivery_method_id')
        .leftJoin(Currencies,'cu','cu.currency_id = co.currency_id')
        .leftJoin(PaymentMethod,'payme','payme.payment_method_id = co.Payment_method_id')
        .leftJoin(PaymentTerms,'payter','payter.payment_terms_id = co.Payment_terms_id')
        .leftJoin(ItemCreation,'fgi','fgi.fg_item_id = co.fg_item_id')
        .leftJoin(OrderLine,'col','col.co_id = co.co_id')
        .leftJoin(Address,'delad','delad.address_id = col.delivery_address')
        .leftJoin(EmplyeeDetails,'mer','mer.employee_id = co.merchandiser')
        .leftJoin(EmplyeeDetails,'pla','pla.employee_id = co.planner')
        .leftJoin(UomEntity,'uom','uom.id = co.quantity_uom_id')
        .leftJoin(CoTypes,'cotype','cotype.co_type_id = co.co_type_id')
        .where(`co.co_id = ${req.styleOrderId}`)
        if (req?.buyerId !== undefined) {
            query.andWhere(`buyer_id ='${req.buyerId}'`)
        }
        return query.getRawMany()

    }

    async getCoLineInfoById(req:StyleOrderId):Promise<any>{
        const query = await this.createQueryBuilder('co')
        .select(`co.co_id as coId,co.order_number,co.item_code,co.buyer_id,bu.buyer_name,bu.buyer_code,co.facility_id,fa.name as factoryName,co.warehouse_id,w.warehouse_name,co.remarks,co.buyer_po_number,co.order_date,co.shipment_type,co.buyer_style,co.agent,emp.first_name AS agentName,emp.employee_code as AgentCode,co.buyer_address,col.co_line_id as coLineId, col.buyer_po_number as buyerPoNumber, 
        col.season_code as seasonCode,col.co_number as coNumber, col.co_line_number as coLineNumber,col.order_number as orderNumber,col.sku_code as skuCode,col.delivery_address as deliveryAddress, col.order_quantity as orderQuantity ,col.colour as colour,col.status,col.size,col.destination,col.uom_id,col.discount,col.sale_price as salePrice,col.co_percentage as coPercentage,col.delivery_date as deliveryDate,col.exf_date as exfDate,col.colour_id,col.size_id,col.destination_id,col.uom_id,uom.uom`)
        .leftJoin(Buyers,'bu',`bu.buyer_id = co.buyer_id`)
        .leftJoin(FactoriesEntity,'fa',`fa.id = co.facility_id`)
        .leftJoin(Warehouse,'w',`w.warehouse_id = co.warehouse_id`)
        .leftJoin(EmplyeeDetails,'emp',`emp.employee_id = co.agent`)
        .leftJoin(Address,'add',`add.address_id = co.buyer_address`)
        .leftJoin(PackageTerms,'pacter',`pacter.package_terms_id = co.package_terms_id`)
        .leftJoin(DeliveryTerms,'delter','delter.delivery_terms_id = co.delivery_terms_id')
        .leftJoin(DeliveryMethod,'delimet','delimet.delivery_method_id = co.delivery_method_id')
        .leftJoin(Currencies,'cu','cu.currency_id = co.currency_id')
        .leftJoin(PaymentMethod,'payme','payme.payment_method_id = co.Payment_method_id')
        .leftJoin(PaymentTerms,'payter','payter.payment_terms_id = co.Payment_terms_id')
        .leftJoin(ItemCreation,'fgi','fgi.fg_item_id = co.fg_item_id')
        .leftJoin(CoLine,'col','col.co_id = co.co_id')
        .leftJoin(Address,'delad','delad.address_id = col.delivery_address')
        .leftJoin(EmplyeeDetails,'mer','mer.employee_id = co.merchandiser')
        .leftJoin(EmplyeeDetails,'pla','pla.employee_id = co.planner')
        .leftJoin(UomEntity,'uom','uom.id = co.quantity_uom_id')
        .leftJoin(CoTypes,'cotype','cotype.co_type_id = co.co_type_id')
        .where(`co.co_id =  ${req.styleOrderId}`)
        return query.getRawMany()

    }

}