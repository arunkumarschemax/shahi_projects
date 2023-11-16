import { IsImportedItemEnum, PropertyEnum } from "@project-management-system/shared-models";
import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { FgItemBom } from "../substituion/fg-item-bom.entity";

@Entity('rm_items')
export class RmCreationEntity{
    
@PrimaryGeneratedColumn("increment", { name: 'rm_item_id' })
rmitemId:number;

@Column("varchar",{
    nullable: false,
    length: 155,
    name:"item_code"
})
itemCode:string;

@Column("int",{
    nullable: true,
    name:"item_category_id"
})
itemCategoriesId:number;

@Column("int",{
    nullable: false,
    name:"pch_id"
})
pchId:number;

@Column("int",{
    nullable: true,
    name:"facility_id"
})
facilityID:number;

@Column("varchar",{
    nullable: true,
    length: 150,
    name:"generic_code"
})
genericCode:string;

@Column("varchar",{
    nullable: true,
    length: 150,
    name:"supply_lead_time"
})
supplyLeadTime:string;

@Column("varchar",{
    nullable: true,
    length: 200,
    name:"supplier"
})
supplier:string;

@Column("varchar",{
    nullable: true,
    length: 200,
    name:"consumption"
})
consumption:string;


@Column("int",{
    nullable: true,
    name:"total"
})
total:number;

@Column("varchar",{
    nullable: false,
    length: 200,
    name:"delivery_terms"
})
deliveryTerms:string;

@Column("varchar",{
    nullable: false,
    length: 200,
    name:"delivery_method"
})
deliveryMethod:string;

@Column("varchar",{
    nullable: true,
    length: 255,
    name:"structure"
})
structure:string;

@Column("varchar",{
    nullable: true,
    length: 150,
    name:"quality"
})
quality:string;

@Column("varchar",{
    nullable: false,
    length: 255,
    name:"item_name"
})
itemName:string;

@Column("int",{
    nullable: false,
    name:"item_type_id"
})
itemIypeId:number;

@Column("varchar",{
    nullable: true,
    length: 255,
    name:"placement"
})
placement:string;

@Column("int", {
    nullable: true,
    name: "fabric_finish_id" 
  })
  fabricFinishId: number;

@Column("int",{
    nullable: true,
    name:"responsible_id"
})
responsibleId:number;

@Column("varchar",{
    nullable: true,
    length: 255,
    name:"dev_responsible"
})
devResponsible:string;

@Column("int",{
    nullable: false,
    name:"basic_uom_id"
})
basicUomId:number;


@Column("int",{
    nullable: true,
    name:"alt_uom_id"
})
altUomId:number;


@Column("varchar",{
    nullable: false,
    length: 255,
    name:"multiplication_factor"
})
multiplicationFactor:string;

@Column("int",{
    nullable: false,
    name:"currency_id"
})
currencyId:number;

@Column("varchar",{
    nullable: false,
    length: 155,
    name:"price"
})
price:string;

@Column("varchar",{
    nullable: false,
    length: 155,
    name:"tax"
})
tax:string;

@Column("varchar",{
    nullable: true,
    length: 155,
    name:"purchase_price_qty"
})
purchasePriceQty:string;

@Column("varchar",{
    nullable: true,
    length: 155,
    name:"sale_tax"
})
saleTax:string;

@Column("varchar",{
    nullable: true,
    length: 155,
    name:"excise_duty"
})
exciseDuty:string;


@Column("int",{
    nullable: true,
    name:"license_id"
})
licenseId:number;

@Column('enum',{
    name:'property',
enum:PropertyEnum
})
property:PropertyEnum;

@Column('enum',{
    name:'is_imported_item',
enum:IsImportedItemEnum,
default:IsImportedItemEnum.NO,
})
isImportedItem:IsImportedItemEnum;

@Column("varchar",{
    nullable: true,
    length: 155,
    name:"is_sale_item"
})
saleItem:string;

@Column("varchar",{
    nullable: true,
    length: 155,
    name:"wastage"
})
wastage:string;

@Column("varchar",{
    nullable: true,
    length: 155,
    name:"cost_Group"
})
costGroup:string;

@Column("varchar",{
    nullable: true,
    length: 255,
    name:"remarks"
})
remarks:string;

@Column("varchar",{
    nullable: true,
    length: 255,
    name:"attached_warehouse"
})
attachedWareHouse:string;

@Column("varchar",{
    nullable: true,
    length: 255,
    name:"planner"
})
planner:string;

@Column("int",{
    nullable: true,
    name:"business_area_id"
})
businessArea:number;

@Column("int",{
    nullable: false,
    name:"hierarchy_Level_id"
})
hierarchyLevelId:number;

@Column("int",{
    nullable: false,
    name:"product_group_id"
})
productGroupId:number;

@Column("int",{
    nullable: false,
    name:"procurement_gorup_id"
})
procurementGroupId:number;

@Column("varchar",{
    nullable: true,
    name:"item_group_id"
})
itemGroupId:string;

@Column("varchar",{
    nullable: true,
    length: 255,
    name:"use_in_operation"
})
useInOperation:string;

@Column("boolean", {
    nullable: false,
    default: true,
    name: "is_active"
  })
  isActive: boolean;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime"
  })
  createdAt: Date;

  @Column("varchar", {
    nullable: false,
    name: "created_user",
    length: 50
  })
  createdUser: string | null;


  @UpdateDateColumn({
    name: "updated_at",
    type: 'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "updated_user",
    length: 50
  })
  updatedUser: string | null;

  @VersionColumn({
    default: 1,
    name: "version_flag"
  })
  versionFlag: number;

  @OneToMany(type=>FgItemBom, fg=>fg.rmItemInfo,{cascade: true})
    fgItemBomInfo:FgItemBom[];
}