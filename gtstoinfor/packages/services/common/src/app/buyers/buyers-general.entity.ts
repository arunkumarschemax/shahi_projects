import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Buyers } from "./buyers.entity";

@Entity('buyer_general_attributes')
export class BuyerGeneralAttributesEntity {

    @PrimaryGeneratedColumn('increment',{
        name:'buyer_general_attribute_id'
    })
    buyerGeneralAttributeId : number;

    @Column('varchar',{
        name:'attribute_name'
    })
    attributeName: string;

    @Column('varchar',{
        name:'attribute_value'
    })
    attributeValue: string;

    // @ManyToOne(type => Attributes, attribute => attribute.generalAttributesInfo,{nullable:false})
    // @JoinColumn({name:'attribute_id'})
    // attributeInfo: Attributes

    @ManyToOne(type => Buyers, buyer => buyer.generalAttributesInfo,{nullable:false})
    @JoinColumn({name:'buyer_id'})
    buyerInfo: Buyers


}