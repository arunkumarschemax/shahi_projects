
import {Column,Entity,PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";


@Entity('variety')
export class variety{

@PrimaryGeneratedColumn("increment",
{name:'variety_id'})
varietyId:number;

@Column("varchar",{
     nullable: false,
    length:15,
    name:"variety"
})
 variety:string;

@Column("varchar", {
      nullable: false,
      name: "variety_code"
    })
varietyCode: string;


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