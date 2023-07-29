import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Item } from '../item-entity';
import { ItemCategory } from '../../item-categories/item-categories.entity';
import { ItemSubCategory } from '../../item-sub-categories/item-sub-category.entity';

@Injectable()
export class ItemsRepository extends Repository<Item> {

    constructor(@InjectRepository(Item) private item: Repository<Item>
    ) {
        super(item.target, item.manager, item.queryRunner);
    }

    async getItem():Promise<any>{
        const query = await this.createQueryBuilder('i')
        .select(`i.item_id as itemId,i.item_name as itemName,i.item_code as itemCode,i.item_category_id as itemCategoryId,i.item_sub_category_id as itemSubCategoryId,i.brand_id as brandId,i.min_qnty as minQuantity,i.uom_id as uomId,i.remarks,i.is_active as isActive,i.created_at as createdAt,i.created_user as createdUser,i.version_flag as versionFlag,ic.item_category as itemCategory,isc.item_sub_category as itemSubCategory,isc.category_code as itemSubCategoryCode,ic.item_category_code as itemCategoryCode`)
        .leftJoin(ItemCategory,`ic`,`ic.item_category_id =i.item_category_id`)
        .leftJoin(ItemSubCategory,`isc`,`isc.item_sub_category_id=i.item_sub_category_id`)
        const result = query.getRawMany();
        return result
        
    }
   
}