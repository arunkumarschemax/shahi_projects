import { PropertyEnum } from "@project-management-system/shared-models";
import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity('rm-items')
export class FabricCreationEntity{
    
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
itemCategory:number;

@Column("int",{
    nullable: false,
    name:"pch_id"
})
pch:string;

@Column("int",{
    nullable: true,
    name:"facility_id"
})
facility:number;

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
itemIype:string;

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
  fabricFinish: number;

@Column("varchar",{
    nullable: false,
    length: 255,
    name:"responsible"
})
responsible:string;

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
basicUom:number;


@Column("int",{
    nullable: false,
    name:"alt_uom_id"
})
altUom:number;


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
currency:number;

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
license:number;

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
itemGroup:number;

@Column("varchar",{
    nullable: false,
    length: 255,
    name:"use_in_operation"
})
useInOperation:string;
}