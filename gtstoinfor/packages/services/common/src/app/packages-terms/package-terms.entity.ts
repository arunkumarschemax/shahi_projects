import {Column,Entity,Index,PrimaryGeneratedColumn,VersionColumn, UpdateDateColumn, CreateDateColumn, OneToMany} from "typeorm";
import { Settings } from "../settings/settings.entity";
@Entity('package_terms')
export class PackageTerms {

  @PrimaryGeneratedColumn("increment",{name:'package_terms_id'})
  packageTermsId:number;
  

  @Column("varchar",{
      nullable:false,
      length:100,
      name:"package_terms_name"
      })
  @Index({unique:false})
  packageTermsName:string;

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

  @OneToMany(type => Settings, settings => settings.packageTermsInfo,{cascade: true})
  settingsInfo : Settings
}
