import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('inner_dia')
export class InnerDiaEntity {

  @PrimaryGeneratedColumn("increment",
  {name:'inner_dia_id'})
  innerDiaId:number;

  @Column("varchar",{
    nullable:false,
    length:100,
    name:"inner_dia"
    })
  innerDia:string;
  
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
      default:"ADMIN",
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
