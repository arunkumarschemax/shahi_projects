import { ViewEntity, ViewColumn  } from "typeorm"
import { Item } from "./item-entity"
@ViewEntity({
    expression: `
    SELECT i.item_id AS itemId,item_name AS itemName,item_code AS itemCode,i.is_active AS isActive,ic.item_category_id AS itemCategoryId,ic.item_category AS itemCategory,
    isc.item_sub_category_id AS itemSubcategoryId, isc.item_sub_category AS itemSubcategory, b.brand_id AS brandId,b.brand_name AS brandName,i.min_qnty AS moq,u.id AS uomId,u.uom AS uomName,i.remarks AS remarks
    FROM items i LEFT JOIN item_categories ic ON ic.item_category_id= i.item_category_id 
    LEFT JOIN uom u ON u.id=i.uom_id
    LEFT JOIN brands b ON b.brand_id=i.brand_id
    LEFT JOIN item_sub_categories isc ON isc.item_sub_category_id=i.item_sub_category_id
    where u.id=2
    `,
})
export class ItemView {
    @ViewColumn()
    itemId: number

    @ViewColumn()
    itemName: string

    @ViewColumn()
    itemCode: string
    @ViewColumn()
    isActive:boolean
    @ViewColumn()
    itemCategoryId:string
    @ViewColumn()
    itemCategory:string
    @ViewColumn()
    itemSubcategoryId:number
    @ViewColumn()
    itemSubcategory
    @ViewColumn()
    brandId:number
    @ViewColumn()
    brandName:string
    @ViewColumn()
    moq:number
    @ViewColumn()
    uomId:number
    @ViewColumn()
    uomName:string
    @ViewColumn()
    remarks:string

}