import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { SampleRequest } from "../sample-dev-request/entities/sample-dev-request.entity";


@Entity('product')
export class Product{

@PrimaryGeneratedColumn("increment",{name:'product_id'})
productId:number;

@Column("varchar",{
    nullable: true,
    length:50,
    name:"product"
})
product:string;

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
}
