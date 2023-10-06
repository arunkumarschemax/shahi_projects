import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { AccountControlObject } from "../account-control-objects/account-control-objects-entity";import { Settings } from "../settings/settings.entity";
import { SampleRequest } from "../sample-dev-request/sample-dev-request.entity";


@Entity('profit_control_head')
export class ProfitControlHead{

@PrimaryGeneratedColumn("increment",{name:'profit_control_head_id'})
profitControlHeadId:number;
@Column("varchar",{
    nullable: true,
    length:15,
    name:"profit_control_head"
})
profitControlHead:string;

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
@OneToMany(()=>AccountControlObject, account=>account.pch,{cascade:true})
accountControl:AccountControlObject;

@OneToMany(type => Settings, settings => settings.pchInfo,{cascade: true})
settingsInfo : Settings

@OneToMany(()=>SampleRequest, sampleReq => sampleReq.pch, {cascade: true})
  sampleReq : SampleRequest[]
}
