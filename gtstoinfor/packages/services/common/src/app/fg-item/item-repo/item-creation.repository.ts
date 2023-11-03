import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "rxjs";
import { ItemCreation } from "../item_creation.entity";
import { ItemCreFilterRequest } from "@project-management-system/shared-models";



@Injectable()
export class ItemCreationRepository extends Repository<ItemCreation> {
    constructor(@InjectRepository(ItemCreation) private repo: Repository<ItemCreation>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllFgItemCrted(req: ItemCreFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('fg_item')
        .select(`*`).where('1=1'); 
      
        if (req.style !== undefined) {
          query.andWhere(`style_no = :style`, { style: req.style }); 
        }
        if (req.itemName !== undefined) {
            query.andWhere(`item_name = :itemName`, { itemName: req.itemName }); 
          }
          if (req.brandId !== undefined) {
            query.andWhere(`brand_id = :brandId`, { brandId: req.brandId }); 
          }
          if (req.confirmStartDate !== undefined) {
            query.andWhere(`Date(order_confirmed_date) BETWEEN '${req.confirmStartDate}' AND '${req.confirmEndDate}'`)
        }
      
        let data:ItemCreation[] = await query.getRawMany();
        return data;
      }


      
}


















// .select(`fg_item_id,item_name,item_code,DESCRIPTION,item_type_id,brand_id,category_id,sub_category_id,season_id,responsible_person_id,product_designer_id,approver,production_merchant,pd_merchant,factory_merchant,sale_person_id,style_no,internal_style_id,uom,alt_uom,currency,item_group,item_group,product_group,business_area,basic_uom,group_tech_class,composition,target_currency,no_of_lace_panel,search_group,conversion_factor_id,reference_id,projection_order_id,buying_house_commision,sale_price_qty,license_id,custom_group_id,national_dbk,rosl_group,is_sub_contract,sale_price,order_confirmed_date,first_ex_factory_date,order_close_date,moq,order_qty,facility_id,is_active,created_at,created_user,updated_at,updated_user,version_flag,range AS irange`)