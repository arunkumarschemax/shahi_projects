import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "rxjs";
import { ItemCreation } from "../item_creation.entity";
import { ItemCreFilterRequest } from "@project-management-system/shared-models";
import { join } from "path";
import { Currencies } from "../../currencies/currencies.entity";
import { ItemTypeEntity } from "../../item-type/item-type.entity";
import { Brands } from "../../master-brands/master-brands.entity";
import { ItemCategory } from "../../item-categories/item-categories.entity";
import { ItemSubCategory } from "../../item-sub-categories/item-sub-category.entity";
import { EmplyeeDetails } from "../../employee-details/dto/employee-details-entity";
import { UomEntity } from "../../uom/uom-entity";
import { ItemGroup } from "../../item-group/item-group.entity";
import { ProductGroup } from "../../product group/product-group-entity";
import { CompositionEnitty } from "../../composition/composition.entity";
import { GroupTechClassEntity } from "../../group-tech-class/group-tech-class.entity";
import { RangeEnitty } from "../../range/range-entity";
import { LiscenceType } from "../../liscence-type/liscence-type.entity";
import { CustomGroups } from "../../custom groups/custom-groups.entity";
import { ROSLGroups } from "../../rosl groups/rosl-groups.entity";
import { FactoriesEntity } from "../../factories/factories.entity";
import { BuyingHouse } from "../../buying-house/buying-house.entity";
import { SearchGroupEnitty } from "../../search-group/search-group.entity";
import { Style } from "../../style/dto/style-entity";
import { BusinessArea } from "../../business-area/business-area.entity";



@Injectable()
export class ItemCreationRepository extends Repository<ItemCreation> {
    constructor(@InjectRepository(ItemCreation) private repo: Repository<ItemCreation>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllFgItemCrted(req: ItemCreFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('fgi')
        .select(`fg_item_id,fgi.is_active,reference,style_no,item_name,fgi.item_group AS itemGroup, item_type, item_code, brand_name, item_category, item_sub_category AS itemSubCtegory,CONCAT(ed.first_name, ' ', ed.last_name) AS responsible_person,CONCAT(epr.first_name, ' ', epr.last_name) AS product_designer,
        CONCAT(epa.first_name, ' ', epa.last_name) AS approver,CONCAT(eppt.first_name, ' ', eppt.last_name) AS pd_merchant,CONCAT(ept.first_name, ' ', ept.last_name) AS factory_merchant,
        CONCAT(eps.first_name, ' ', eps.last_name) AS sale_person_id,internal_style_id,uo.uom AS uom,ut.uom AS alt_uom,currencies.currency_name AS currency_name,
        ig.item_group AS item_group,pgi.product_group,business_area,uo.uom AS basicUom,group_tech_class,co.composition_code AS composition ,gtc.group_tech_class_code AS group_tech_class,
        tc.currency_name AS target_currency,fgi.fg_item_id,st.style,
        r.range_code AS rangee ,no_of_lace_panel ,sale_price_qty ,lt.liscence_type,cg.custom_group, national_dbk ,rg.rosl_group ,is_sub_contract ,sale_price,
        fgi.order_confirmed_date,first_ex_factory_date,order_close_date,moq,order_qty,f.name,season,conversion_factor,projection_order, bh.buying_house,sg.search_grp_name, CONCAT(ba.business_area_code,'-',ba.business_area_name) AS business_area`) 
        .leftJoin(Currencies, 'currencies','currencies.currency_id = fgi.currency')
        .leftJoin(ItemTypeEntity,'it','it.item_type_id = fgi.item_type_id')
        .leftJoin(Brands,'b','b.brand_id = fgi.brand_id')
        .leftJoin(ItemCategory,'ic','ic.item_category_id = fgi.category_id')
        .leftJoin(ItemSubCategory,'isc','isc.item_sub_category_id = fgi.sub_category_id')
        .leftJoin(EmplyeeDetails,'ed','ed.employee_id = fgi.responsible_person_id')
        .leftJoin(EmplyeeDetails,'epr','epr.employee_id = fgi.product_designer_id')
        .leftJoin(EmplyeeDetails,'epa','epa.employee_id = fgi.approver')
        .leftJoin(EmplyeeDetails,'epp','epp.employee_id = fgi.production_merchant')
        .leftJoin(EmplyeeDetails,'eppt','eppt.employee_id = fgi.pd_merchant')
        .leftJoin(EmplyeeDetails,'ept','eppt.employee_id = fgi.factory_merchant')
        .leftJoin(EmplyeeDetails,'eps','eps.employee_id = fgi.sale_person_id')
        .leftJoin(UomEntity,'uo',' uo.id = fgi.basic_uom')
        .leftJoin(UomEntity,'ut','ut.id = fgi.alt_uom')
        .leftJoin(Currencies, 'tc','tc.`currency_id` = fgi.target_currency ')
        .leftJoin(ItemGroup, 'ig','ig.item_group_id = fgi.item_group')
        .leftJoin(ProductGroup, 'pgi','pgi.product_group_id = fgi.product_group')
        .leftJoin(CompositionEnitty, 'co','co.id = fgi.composition')
        .leftJoin(GroupTechClassEntity,'gtc','gtc.group_tech_class_id = fgi.group_tech_class')
        .leftJoin(RangeEnitty, 'r','r.`id` = fgi.RANGE')
        .leftJoin(LiscenceType, 'lt','lt.liscence_type_id = fgi.license_id')
        .leftJoin(CustomGroups, 'cg','cg.custom_group_id = fgi.custom_group_id ')
        .leftJoin(ROSLGroups, 'rg','rg.rosl_group_id = fgi.rosl_group ')
        .leftJoin(FactoriesEntity, 'f','f.id = fgi.facility_id ')
        .leftJoin(BuyingHouse, 'bh','bh.buying_house_id = fgi.buying_house_commision_id  ')
        .leftJoin(SearchGroupEnitty, 'sg','sg.id = fgi.search_group')
        .leftJoin(Style,'st','st.style_id = fgi.internal_style_id')
        .leftJoin(BusinessArea,'ba','ba.business_area_id = fgi.business_area ')

        .where('1=1');
        if (req.style !== undefined) {
          query.andWhere(`style_no = :style`, { style: req.style }); 
        }
        if (req.itemName !== undefined) {
            query.andWhere(`item_name = :itemName`, { itemName: req.itemName }); 
          }
          if (req.brandId !== undefined) {
            query.andWhere(`brand_name = :brand`, { brand: req.brandId }); 
          }
          if (req.confirmStartDate !== undefined) {
            query.andWhere(`Date(order_confirmed_date) BETWEEN '${req.confirmStartDate}' AND '${req.confirmEndDate}'`)
        }
      
        let data:ItemCreation[] = await query.getRawMany();
        return data;
      }

  
      async getAll(): Promise<any> {
        const query = this.createQueryBuilder()
            .select(`fg_item_id,item_name,item_code`)
            .groupBy(`item_code,item_name`)
        return await query.getRawMany();
    }
    async getAllstyle(): Promise<any> {
      const query = this.createQueryBuilder()
          .select(`fg_item_id,style_no`)
          .groupBy(`style_no`)
      return await query.getRawMany();
  }
  async getAllitems(): Promise<any> {
    const query = this.createQueryBuilder()
        .select(`fg_item_id,item_name`)
        .groupBy(`item_name`)
    return await query.getRawMany();
}

async getBrand(): Promise<any> {
  const query = this.createQueryBuilder(`fgi`)
      .select(`fg_item_id,brand_name`)
      .leftJoin(Brands,'b','b.brand_id = fgi.brand_id')
      .where('1=1')
      .groupBy(`brand_name`)
  return await query.getRawMany();
}
}
