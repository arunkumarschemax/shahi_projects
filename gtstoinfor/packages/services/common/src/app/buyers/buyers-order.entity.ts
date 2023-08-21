import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Buyers } from "./buyers.entity";
import { Attributes } from "../attributes/attributes.entity";

@Entity('buyer_order_attributes')
export class BuyerOrderAttributesEntity {

    @PrimaryGeneratedColumn('increment',{
        name:'buyer_order_attribute_id'
    })
    buyerOrderAttributeId : number;

    @Column('varchar',{
        name:'attribute_name'
    })
    attributeName: string;

    @Column('varchar',{
        name:'attribute_value'
    })
    attributeValue: string;

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

    @ManyToOne(type => Attributes, attribute => attribute.orderAttributesInfo,{nullable:false})
    @JoinColumn({name:'attribute_id'})
    attributeInfo: Attributes

    @ManyToOne(type => Buyers, buyer => buyer.orderAttributesInfo,{nullable:false})
    @JoinColumn({name:'buyer_id'})
    buyerInfo: Buyers


}