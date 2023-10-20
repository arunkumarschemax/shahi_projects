import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('business_area')
export class BusinessArea {

  @PrimaryGeneratedColumn("increment",{name:'business_area_id'})
  businessAreaId:number;

  @Column('varchar',{
    name:'business_area_code',
    length:20,
    nullable: false
  })
  businessAreaCode: string;

  @Column('varchar',{
    name:'business_area_name',
    length:50,
    nullable: false
  })
  businessAreaName: string;

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

}