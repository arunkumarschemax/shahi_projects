import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Settings } from "../settings/settings.entity";
import { StyleOrder } from "../style-order/style-order.entity";

@Entity('co_types')
export class CoTypes {

  @PrimaryGeneratedColumn("increment",{name:'co_type_id'})
  coTypeId:number;

  @Column('varchar',{
    name:'co_type',
    length:50,
    nullable: false
  })
  coType: string;

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
      default: "ADMIN",
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

  @OneToMany(type => Settings, settings => settings.coTypeInfo ,{cascade: true})
  settingsInfo : Settings

  @OneToMany(type=>StyleOrder, styleorder=>styleorder.coTypeInfo,{cascade: true})
  styleOrderInfo:StyleOrder;

}