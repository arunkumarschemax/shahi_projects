import { PropertyEnum } from "@project-management-system/shared-models";
import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity('rm-items')
export class RmCreationEntity{
    
@PrimaryGeneratedColumn("increment", { name: 'rm_item_id' })
rmitemId:number;

@Column("varchar",{
    nullable: true,
    length: 155,
    name:"item_code"
})
itemCode:string;

@Column("int",{
    nullable: false,
    name:"item_category_id"
})
itemCategoryId:number;

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
    nullable: false,
    length: 150,
    name:"generic_code"
})
genericCode:string;

@Column("varchar",{
    nullable: false,
    length: 255,
    name:"structure"
})
structure:string;

@Column("varchar",{
    nullable: false,
    length: 150,
    name:"quality"
})
quality:string;

@Column("varchar",{
    nullable: false,
    length: 255,
    name:"description"
})
description:string;

@Column("int",{
    nullable: false,
    name:"item_type_id"
})
itemIypeId:number;

@Column("varchar",{
    nullable: false,
    length: 255,
    name:"placement"
})
placement:string;

@Column("int", {
    nullable: false,
    name: "fabric_finish_id" 
  })
  fabricFinishId: number;

@Column("int",{
    nullable: false,
    name:"responsible_id"
})
responsibleId:number;

@Column("varchar",{
    nullable: false,
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
    nullable: false,
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
    nullable: false,
    length: 155,
    name:"purchase_price_qty"
})
purchasePriceQty:string;

@Column("varchar",{
    nullable: false,
    length: 155,
    name:"sale_tax"
})
saleTax:string;

@Column("varchar",{
    nullable: false,
    length: 155,
    name:"excise_duty"
})
exciseDuty:string;


@Column("int",{
    nullable: false,
    name:"license_id"
})
licenseId:number;

@Column('enum',{
    name:'property',
enum:PropertyEnum
})
property:PropertyEnum;

@Column("varchar",{
    nullable: false,
    length: 155,
    name:"is_sale_item"
})
SaleItem:string;

@Column("varchar",{
    nullable: false,
    length: 155,
    name:"wastage"
})
wastage:string;

@Column("varchar",{
    nullable: false,
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

@Column("int",{
    nullable: true,
    name:"item_group_id"
})
itemGroupId:number;

@Column("varchar",{
    nullable: false,
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
}