import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { SampleRequest } from "../sample-dev-request/entities/sample-dev-request.entity";


@Entity('product_group')
export class ProductGroup{

@PrimaryGeneratedColumn("increment",{name:'product_group_id'})
productGroupId:number;

@Column("varchar",{
    nullable: true,
    length:15,
    name:"product_group"
})
productGroup:string;

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

// @OneToOne(()=> ItemTypeEntity,itemtype=>itemtype.productgroup)
// ItemType:ItemTypeEntity[]

// @OneToMany(type => ItemTypeEntity, itemType => itemType.productGroup,{cascade: true})
//   itemTypes: ItemTypeEntity[];
// }
}
