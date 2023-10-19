import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { BuyersDestionations } from "../buyers-destination/buyers-destination.entity";
import { BuyersSize } from "../buyers-destination/buyers-sizes.entity";
import { ItemSkus } from "../sku-generation/sku-generation.entity";
import { CoLine } from "../style-order/co-line.entity";
import { Division } from "../division/division.entity";

@Entity('size')
export class Size{
  
    @PrimaryGeneratedColumn("increment",{name:'size_id'})
sizeId:number;

@Column("varchar",{
    nullable: true,
    length:20,
    name:"sizes"
})
size:string;

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

@OneToMany(type=>BuyersSize, buyers=>buyers.sizeInfo,{cascade: true})
sizesInfo:BuyersSize;

@OneToMany(type=>ItemSkus, item=>item.sizeInfo,{cascade: true})
itemSkuInfo:ItemSkus;

@OneToMany(type=>CoLine, co=>co.sizeInfo,{cascade: true})
coLineInfo:CoLine;

@ManyToOne(()=> Division, division=>division.sizes)
@JoinColumn({name:'division_id'})
division:Division;
}
