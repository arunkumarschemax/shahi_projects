import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemSkus } from "./sku-generation.entity";
import { SKUlistFilterRequest, SkuStatusEnum } from "@project-management-system/shared-models";
import { Colour } from "../colours/colour.entity";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { Style } from "../style/dto/style-entity";
import { Division } from "../division/division.entity";
import { StyleOrder } from "../style-order/style-order.entity";
import { CoLine } from "../style-order/order-line.entity";

@Injectable()
export class ItemSkuRepository extends Repository<ItemSkus> {

    constructor(@InjectRepository(ItemSkus) private itemskuRepo: Repository<ItemSkus>
    ) {
        super(itemskuRepo.target, itemskuRepo.manager, itemskuRepo.queryRunner);
    }

    async getDestinationsByItem(itemCode: string):Promise<any>{
        const query = await this.createQueryBuilder('is')
        .select(`is.destination,is.destination_id`)
        .where(`is.item_sku_id > 0 and is.status = '${SkuStatusEnum.OPEN}'`)
        if(itemCode){
            query.andWhere(`is.item_code = '${itemCode}'`)
        }
        query.orderBy(`is.destination`)
        query.groupBy(`is.destination`)
        return query.getRawMany()
    }

    async getDataByItem(itemCode:string):Promise<any>{
        const query = await this.createQueryBuilder('is')
        .select(`*`)
        // .leftJoin(Colour,`c`,`c.colourId = is.color_id`)
        // .leftJoin(Size,`s`,`s.size_id = is.size_id`)
        // .leftJoin(Destination,`d`,`d.destination_id = is.destination_id`)
        .where(`is.itemCode = '${itemCode}'`)
        .groupBy(`is.color,is.size,is.destination`)
        return query.getRawMany()

    }

    async getItemCode(req:SKUlistFilterRequest):Promise<any>{
        const query = await this.createQueryBuilder('i')
        .select(`item_code,fg_item_id `)
        .groupBy(`item_code`)
        return await query.getRawMany()
    }


    async getSkuList(req:SKUlistFilterRequest):Promise<any>{
        // console.log(req,"req in quary")
        const query = await this.createQueryBuilder('is')
        .select(`is.item_sku_id , is.sku_code , is.status , is.po_number , is.po_line_number , is.item_code , is.size  ,  is.color ,  is.destination ,
        is.fg_item_id, is.size_id , is.destination_id , is.rm_mapping_status , is.division_id  colour_id , colour,style,div.division_name,
        warehouse_id , facility_id , is.style_id , package_terms_id , delivery_method_id , delivery_terms_id , currency_id,  Payment_method_id ,
         Payment_terms_id , buyer_id , season , merchandiser , planner , co_type_id , quantity_uom_id , item_sale_price_qty,so.status AS coStatus`)
        .leftJoin(Colour,`c`,`c.colourId = is.color_id`)
        .leftJoin(Size,`s`,`s.size_id = is.size_id`)
        .leftJoin(Destination,`d`,`d.destination_id = is.destination_id`)
        .leftJoin(Style,`st`,`st.style_id = is.style_id`)
        .leftJoin(Division,`div`,`div.division_id = is.division_id`)
        .leftJoin(CoLine,`co`,`co.sku_code = is.sku_code`)
        .leftJoin(StyleOrder,`so`,`so.co_id = co.co_id`)
        //    .where(`item_code = '${req.itemsNo}'`)
       .where('is.item_code = :itemCode', { itemCode: req.itemsCode })
        .groupBy(`is.color,is.size,is.destination`)
        return query.getRawMany()

    }

    async getSize(req:SKUlistFilterRequest):Promise<any>{
        const query = await this.createQueryBuilder('i')
     .select(`size,size_id`)
     .groupBy(`size_id`)
     return await query.getRawMany()
    }

    async getColor(req:SKUlistFilterRequest):Promise<any>{
        const query = await this.createQueryBuilder()
        .select(`color,color_id`)
        .groupBy(`color_id`)
        return await query.getRawMany()
    }

    async getDestination(req:SKUlistFilterRequest):Promise<any>{
        const query = await this.createQueryBuilder()
        .select(`destination,destination_id`)
        .groupBy(`destination_id`)
        return await query.getRawMany()
    }
}