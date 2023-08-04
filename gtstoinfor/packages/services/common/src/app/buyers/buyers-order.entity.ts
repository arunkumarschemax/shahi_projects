import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(type => Attributes, attribute => attribute.orderAttributesInfo,{nullable:false})
    @JoinColumn({name:'attribute_id'})
    attributeInfo: Attributes

    @ManyToOne(type => Buyers, buyer => buyer.orderAttributesInfo,{nullable:false})
    @JoinColumn({name:'buyer_id'})
    buyerInfo: Buyers


}