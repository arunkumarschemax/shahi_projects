
import {Column,Entity,PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn, OneToMany} from "typeorm";


@Entity('trim')
export class trimEntity{

@PrimaryGeneratedColumn("increment",
{name:'trim_id'})
trimId:number;

@Column("varchar",{
     nullable: false,
    length:15,
    name:"trim_category"
})
 trimCategory:string;

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

@OneToMany(type => trimEntity, attribute => attribute.trimId,{cascade: true})
    trimInfo : trimEntity
}