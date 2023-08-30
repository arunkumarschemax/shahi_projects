import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Settings } from "../settings/settings.entity";

@Entity('delivery_terms')
export class DeliveryTerms {

  @PrimaryGeneratedColumn("increment",{name:'delivery_terms_id'})
  deliveryTermsId:number;
  
  @Column("varchar",{
      nullable:false,
      length:50,
      name:"delivery_terms_name"
      })
  // @Index({unique:true})
    deliveryTermsName:string;

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
      nullable: true,
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

  @OneToMany(type => Settings, settings => settings.deliveryTermsInfo ,{cascade: true})
  settingsInfo : Settings
 
}
