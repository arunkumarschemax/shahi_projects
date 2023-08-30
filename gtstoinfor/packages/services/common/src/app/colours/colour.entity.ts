import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { BuyersColor } from "../buyers-destination/byers-colors.entity";


@Entity('colour')
export class Colour{

@PrimaryGeneratedColumn("increment",{name:'colour-id'})
colourId:number;
@Column("varchar",{
    nullable: true,
    length:15,
    name:"colour"
})
colour:string;

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
}