import {Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Settings } from "../settings/settings.entity";
import { StyleOrder } from "../style-order/style-order.entity";


@Entity('warehouse')
export class Warehouse {

  @PrimaryGeneratedColumn("increment",{name:'warehouse_id'})
  warehouseId:number;

  @Column("char",{
      nullable:false,
      length:50,
      name:"warehouse_name"
      })
  // @Index({ unique: true })
  warehouseName:string;

  @Column("char",{
    nullable:false,
    length:50,
    name:"warehouse_Code"
    })
// @Index({ unique: true })
warehouseCode:string;

@Column("char",{
  nullable:false,
  length:10,
  name:"category"
  })
// @Index({ unique: true })
category:string;

  @Column("boolean",{
    nullable:false,
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
    nullable: false,
    name: "created_user",
    length:50
})
createdUser: string | null;


  @UpdateDateColumn({
      name: "updated_at",
      type:'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "updated_user",
    length:50
})
updatedUser: string | null;


  @VersionColumn({
      default:1,
      name: "version_flag"
  })
  versionFlag: number;

  // @OneToMany(type=>EndCustomers, endCustomers=>endCustomers.currencyInfo,{cascade: true})
  // endCustomerInfo:EndCustomers[];

  @OneToMany(type => Settings, settings => settings.wareHouseInfo,{cascade: true})
  settingsInfo : Settings

  @OneToMany(type=>StyleOrder, warehouse=>warehouse.warehouseInfo,{cascade: true})
  styleOrderInfo:StyleOrder;

}
