import {Column, Entity, PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { StyleOrder } from "../style-order/style-order.entity";

@Entity('co_bom')
export class CoBom {

    @PrimaryGeneratedColumn("increment",{
        name:'id'
    })
    id:number;

    @Column("int",{
    name:"fg_item_bom_id"
    })
    fgItemBomId:number;

    @Column("varchar",{
        name:"quantity"
    })
    quantity:string

    @Column("varchar",{
        name:"co_number"
    })
    coNumber:string

    @Column("varchar",{
        name:"co_line_number"
    })
    coLineNumber:string

    @Column("varchar",{
        name:"fg_sku"
    })
    fgSku:string

    @ManyToOne(type=> StyleOrder, co=>co.customerorder,{nullable:false,})
    @JoinColumn({name:"co_id"})
    orderId:StyleOrder

}