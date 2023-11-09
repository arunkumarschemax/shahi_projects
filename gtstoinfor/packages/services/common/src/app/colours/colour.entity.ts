import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { BuyersColor } from "../buyers-destination/byers-colors.entity";
import { ItemSkus } from "../sku-generation/sku-generation.entity";
import { CoLine } from "../style-order/order-line.entity";
import { Division } from "../division/division.entity";
import { CoLineEntity } from "../style-order/co-line.entity";

@Entity('colour')
export class Colour{

@PrimaryGeneratedColumn("increment",{name:'colour_id'})
colourId:number;
@Column("varchar",{
    nullable: true,
    length:15,
    name:"colour_Code"
})
colourCode:string;

@Column("varchar",{
    nullable: true,
    length:15,
    name:"colour"
})
colour:string;

@Column("varchar",{
    nullable: true,
    length:250,
    name:"description"
})
description:string;

@Column("varchar",{
    nullable: true,
    length:15,
    name:"option_Group"
})
optionGroup:string;

@Column("boolean",{
    default:true,
    name:"is_active"
    })
  isActive:boolean;

  @CreateDateColumn({
    name: "created_at",
    type:"datetime"
  })
  createdAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "created_user"
})
createdUser: string | null;

@UpdateDateColumn({
    name: "updated_at",
    type:'datetime'
})
updatedAt: Date;

@Column("varchar", {
    nullable: true,
    name: "updated_user"
})
updatedUser: string | null;

@VersionColumn({
    default:1,
    name: "version_flag"
})
versionFlag: number;

// @OneToMany(type=>BuyersColor, buyers=>buyers.colorInfo,{cascade: true})
// colorsInfo:BuyersColor;

@OneToMany(type=>BuyersColor, buyers=>buyers.colorInfo,{cascade: true})
colorsInfo?:BuyersColor;

@OneToMany(type=>ItemSkus, item=>item.colorInfo,{cascade: true})
itemSkuInfo?:ItemSkus;

@OneToMany(type=>CoLine, co=>co.colorInfo,{cascade: true})
coLineInfo?:CoLine;

@ManyToOne(()=> Division, division=>division.Colour)
@JoinColumn({name:'division_id'})
division:Division;

@OneToMany(type=>CoLineEntity, co=>co.colorInfo,{cascade: true})
CoLineData?:CoLineEntity;
}