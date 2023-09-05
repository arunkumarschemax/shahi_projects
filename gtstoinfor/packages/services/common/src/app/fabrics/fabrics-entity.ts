import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";


@Entity('fabrics')
export class Fabrics{

@PrimaryGeneratedColumn("increment",{name:'fabrics_id'})
fabricsId:number;
@Column("varchar",{
    nullable: true,
    length:15,
    name:"fabrics_Name"

})
fabricsName:string;

@Column("varchar",{
    nullable: true,
    length:15,
    name:"fabrics_Code"

})
fabricsCode:string;

@Column("varchar",{
    nullable: true,
    length:255,
    name:"descrption"

})
description:string;

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
