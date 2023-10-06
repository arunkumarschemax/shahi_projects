import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { SampleRequest } from "../sample-dev-request/sample-dev-request.entity";

@Entity('location')
export class Location {

  @PrimaryGeneratedColumn("increment",{name:'location_id'})
  locationId:number;
  
  @Column("varchar",{
      nullable:false,
      length:50,
      name:"location_name"
      })
  // @Index({unique:true})
    locationName:string;

    @Column("varchar",{
      nullable:false,
      length:50,
      name:"location_code"
      })
  // @Index({unique:true})
    locationCode:string;

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
 
  @OneToMany(()=>SampleRequest, (SampleRequest) => SampleRequest.location, {cascade: true})
  sampleReq : SampleRequest[]
}
