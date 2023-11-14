import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "rxjs";
import { ItemCreFilterRequest, RMCreFilterRequest } from "@project-management-system/shared-models";
import { RmCreationEntity } from "./rm-items.entity";
import { ItemCategory } from "../item-categories/item-categories.entity";
import { ProfitControlHead } from "../profit-control-head/profit-control-head-entity";
import { FactoriesEntity } from "../factories/factories.entity";
import { ItemGroup } from "../item-group/item-group.entity";
import { EmplyeeDetails } from "../employee-details/dto/employee-details-entity";
import { ItemTypeEntity } from "../item-type/item-type.entity";
import { ProductGroup } from "../product group/product-group-entity";
import { ProcurmentGroup } from "../procurment group/procurment-group-entity";
import { BusinessArea } from "../business-area/business-area.entity";
import { UomEntity } from "../uom/uom-entity";
import { Currencies } from "../currencies/currencies.entity";
import { FabricFinishTypes } from "../fabric-finish-types/fabric-finish-types.entity";
import { LiscenceType } from "../liscence-type/liscence-type.entity";
import { HierarchyLevel } from "../hirerachy level/hirerachy-level-entity";
import { DeliveryTerms } from "../delivery-terms/delivery-terms.entity";
import { DeliveryMethod } from "../delivery-method/delivery-method.entity";



@Injectable()
export class RmCreationRepository extends Repository<RmCreationEntity> {
    constructor(@InjectRepository(RmCreationEntity) private repo: Repository<RmCreationEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllRmCrted(req: RMCreFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('rmi')
        .select(`rm_item_id,item_code ,item_type,item_category,profit_control_head AS pch  ,item_group, placement , NAME AS facility ,
        CONCAT(ed.first_name, ' ', ed.last_name) AS responsible_person , product_group ,procurment_group,attached_warehouse,planner ,
        CONCAT(ba.business_area_code,'-',ba.business_area_name) AS business_area , uo.uom , currency_name AS currency,sale_tax,price,is_imported_item,rmi.structure , rmi.quality,rmi.description AS descr ,dev_responsible,supplier ,generic_code,fft.fabric_finish_type AS fabricFinish,
        use_in_operation ,ut.uom AS altuom ,multiplication_factor ,purchase_price_qty,excise_duty , lt.liscence_type ,property,is_sale_item ,supply_lead_time,hl.hierarchy_level,total ,
        tax,price,consumption ,wastage,cost_Group ,rmi.remarks , dt.delivery_terms_name ,dm.delivery_method`)
        .leftJoin(ItemCategory,'ic','ic.item_category_id = rmi.item_category_id')
        .leftJoin(ProfitControlHead,'pch','pch.profit_control_head_id = rmi.pch_id')
        .leftJoin(FactoriesEntity, 'f','f.id = rmi.facility_id')
        .leftJoin(ItemGroup, 'ig','ig.item_group_id = rmi.item_group_id')
        .leftJoin(EmplyeeDetails,'ed','ed.employee_id = rmi.responsible_id')
        .leftJoin(ItemTypeEntity,'it','it.item_type_id = rmi.item_type_id')
        .leftJoin(ProductGroup,'pg','pg.product_group_id = rmi.product_group_id')
        .leftJoin(ProcurmentGroup,'pcg',' pcg.procurment_group_id = rmi.procurement_gorup_id ')
        .leftJoin(BusinessArea,'ba','ba.business_area_id = rmi.business_area_id ')
        .leftJoin(UomEntity,'uo','uo.id = rmi.basic_uom_id ')
        .leftJoin(Currencies, 'c','c.currency_id = rmi.currency_id')
        .leftJoin(FabricFinishTypes,'fft','fft.fabric_finish_type_id  =  rmi.fabric_finish_id ')
        .leftJoin(UomEntity,'ut','ut.id = rmi.alt_uom_id')
        .leftJoin(LiscenceType,'lt','lt.liscence_type_id = rmi.license_id ')
        .leftJoin(HierarchyLevel,'hl','hl.hierarchy_level_id = rmi.hierarchy_Level_id ')
        .leftJoin(DeliveryTerms,'dt','dt.delivery_terms_id = rmi.delivery_terms')
        .leftJoin(DeliveryMethod,'dm','dm.delivery_method_id = rmi.delivery_method')

        .where('1=1'); 
      
        if (req.itemGroup !== undefined) {
          query.andWhere(`item_group = :itemGP`, { itemGP: req.itemGroup }); 
        }
        if (req.Currency !== undefined) {
            query.andWhere(`currency_name = Currency`, {Currency: req.Currency }); 
          }
          if (req.itemType !== undefined) {
            query.andWhere(`item_type = :itemtype`, { itemtype: req.itemType }); 
          }
          if (req.productGroup !== undefined) {
            query.andWhere(`product_group = :productGroup`, { productGroup: req.productGroup }); 
          }
          if (req.procurementGroup !== undefined) {
            query.andWhere(`procurment_group = :procurmentGroup`, { procurmentGroup: req.procurementGroup }); 
          }
          
      
        let data:RmCreationEntity[] = await query.getRawMany();
        return data;
      }

      async getCurrencydrop(): Promise<any[]> {
        const query = this.createQueryBuilder('rmi')
        .select(`rm_item_id, currency_name AS currency`)
        .leftJoin(Currencies, 'c','c.currency_id = rmi.currency_id')
       // .where('1=1'); 
       .groupBy('c.currency_name')

        let data:RmCreationEntity[] = await query.getRawMany();
        return data;
      }
      async getItemGroupdrop(): Promise<any[]> {
        const query = this.createQueryBuilder('rmi')
        .select(`rm_item_id,item_group`)
        .leftJoin(ItemGroup, 'ig','ig.item_group_id = rmi.item_group_id')
        .groupBy('ig.item_group')
        let data:RmCreationEntity[] = await query.getRawMany();
        return data;
      }

      
}
