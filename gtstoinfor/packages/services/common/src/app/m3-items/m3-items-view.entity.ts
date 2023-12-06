import { ViewEntity, ViewColumn  } from "typeorm"
@ViewEntity({
    expression: `
    SELECT m3_items_Id AS m3ItemsId,ft.fabric_type_id AS fabricTypeId,ft.fabric_type_name AS fabricTypeName, fw.fabric_weave_id as fabricWeaveId,fw.fabric_weave_name as fabricWeaveName,
    m3Items.weight AS weight, u.id AS uomId,u.uom AS uomName, m3Items.construction AS construction,m3Items.yarn_count AS yarnCount,m3Items.yarn_unit AS yarnUnit,
    m3Items.finish AS finish, m3Items.shrinkage AS shrinkage, m3Items.is_active AS isActive,b.buyer_id AS buyerId,b.buyer_name AS buyerName,m3Items.description AS description,
    m3Items.width AS width, m3Items.width_unit AS widthUnit, ic.item_category_id AS itemCategoryId,ic.item_category AS itemCategory,
    fs.finish_id AS finishId,fs.finish AS finishName,hl.hole_id AS holeId,hl.hole AS holeName, m3Items.logo AS logoType,m3Items.part AS partType,ql.quality_Id AS qualityId,
    ql.quality AS qualityName, st.structure_id AS structureId,st.structure AS structureName,tn.thickness_id AS thicknessId,tn.thickness AS thicknessName,tp.type_id AS typeId,
    tp.type AS typeName, vr.variety_id AS varietyId, vr.variety AS varietyName,m3Items.item_code AS itemCode,tr.trim_id AS trimId,tr.trim_category AS trimCategory,m3Items.item_type AS itemType,m3Items.type AS type
    FROM m3_items AS m3Items
    LEFT JOIN fabric_type ft ON ft.fabric_type_id=m3Items.fabric_type
    LEFT JOIN fabric_weave fw ON fw.fabric_weave_id=m3Items.weave
    LEFT JOIN uom u ON u.id=m3Items.weight_unit
    LEFT JOIN buyers b ON b.buyer_id=m3Items.buyer_id
    LEFT JOIN item_categories AS ic ON ic.item_category_id=m3Items.category_id
    LEFT JOIN colour cr ON cr.colour_id=m3Items.color_id
    LEFT JOIN content ct ON ct.content_id=m3Items.content_id
    LEFT JOIN finish fs ON fs.finish_id=m3Items.finish_id
    LEFT JOIN hole hl ON hl.hole_id=m3Items.hole_id
    LEFT JOIN quality ql ON ql.quality_Id=m3Items.quality_id
    LEFT JOIN structure st ON st.structure_id =m3Items.structure_id
    LEFT JOIN thickness tn ON tn.thickness_id=m3Items.thickness_id
    LEFT JOIN TYPE tp ON tp.type_id =m3Items.type_id
    LEFT JOIN variety vr ON vr.variety_id = m3Items.variety_id
    LEFT JOIN TRIM tr ON tr.trim_id = m3Items.trim_category_id
    `,
})
export class M3ItemView {
    @ViewColumn()
    m3ItemsId:number
    @ViewColumn()
    fabricTypeId:number
    @ViewColumn()
    fabricTypeName:string
    @ViewColumn()
    fabricWeaveId:number
    @ViewColumn()
    fabricWeaveName:string
    @ViewColumn()
    weight:string
    @ViewColumn()
    uomId:number
    @ViewColumn()
    uomName:string
    @ViewColumn()
    construction:string
    @ViewColumn()
    yarnCount:number
    @ViewColumn()
    yarnUnit:number
    @ViewColumn()
    finish:number
    @ViewColumn()
    shrinkage:string
    @ViewColumn()
    isActive:boolean
    @ViewColumn()
    buyerId:number
    @ViewColumn()
    buyerName:string
    @ViewColumn()
    description:string
    @ViewColumn()
    width:number
    @ViewColumn()
    widthUnit:number
    @ViewColumn()
    itemCategoryId:number
    @ViewColumn()
    itemCategory:string
    @ViewColumn()
    finishId:number
    @ViewColumn()
    finishName:string
    @ViewColumn()
    holeId:number
    @ViewColumn()
    holeName:string
    @ViewColumn()
    logoType:string
    @ViewColumn()
    partType:string
    @ViewColumn()
    qualityId:number
    @ViewColumn()
    qualityName:string
    @ViewColumn()
    structureId:number
    @ViewColumn()
    structureName:string
    @ViewColumn()
    thicknessId:number
    @ViewColumn()
    thicknessName:string
    @ViewColumn()
    typeId:number
    @ViewColumn()
    typeName:string
    @ViewColumn()
    varietyId:number
    @ViewColumn()
    varietyName:string
    @ViewColumn()
    itemCode:string
    @ViewColumn()
    trimId:number
    @ViewColumn()
    trimCategory:string
    @ViewColumn()
    itemType:string
    @ViewColumn()
    type:string

}