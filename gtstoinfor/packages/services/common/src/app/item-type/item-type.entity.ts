import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Division } from "../division/division.entity";
import { ProductGroup } from "../product group/product-group-entity";

@Entity('item_type')
export class ItemTypeEntity{
  
    @PrimaryGeneratedColumn("increment",{name:'item_type_id'})
itemTypeId:number;

@Column("varchar",{
    nullable: true,
    length:20,
    name:"item_type"
})
itemType:string;


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



@ManyToOne(()=> Division, division=>division.ItemType)
@JoinColumn({name:'division_id'})
division:Division;


@ManyToOne( ()=> ProductGroup, productGroup => productGroup.itemTypes)
@JoinColumn({name:'product_group_id'})
  productGroup: ProductGroup;
}
