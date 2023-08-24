import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Size } from "../sizes/sizes-entity";

@Entity('buyers_destination')
export class BuyersDestionations {

  @PrimaryGeneratedColumn("increment",{name:'bs_id'})
  BsId:number;

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
   
  @ManyToOne(type=>Size, sizes=>sizes.sizeInfo,{  nullable:false, })
  @JoinColumn({ name:"size-id"})
  sizeInfo: Size;

//   @ManyToOne(type=>Colour, colours=>colours.colourInfo,{  nullable:false, })
//   @JoinColumn({ name:"colour_id"})
//   colourInfo: Colour;

//   @ManyToOne(type=>Destination, destinations=>destinations.destinationInfo,{  nullable:false, })
//   @JoinColumn({ name:"destination_id"})
//   destinationInfo: Destination;
}
