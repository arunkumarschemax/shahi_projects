import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Settings } from "../settings/settings.entity";
import { StyleOrder } from "../style-order/style-order.entity";
import { RackPositionEntity } from "../rm_locations/rack-position.entity";

@Entity('column')
export class Columns {

  @PrimaryGeneratedColumn("increment",{name:'column_id'})
  ColumnId:number;

  @Column('varchar',{
    name:'column',
    length:50,
    nullable: false
  })
  Column: string;

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


  @OneToMany(type=>RackPositionEntity, rack=>rack.column,{cascade: true})
  column:RackPositionEntity;


}