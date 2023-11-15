import {Column, Entity, PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { StyleOrder } from "../style-order/style-order.entity";
import { CoLine } from "../style-order/co-line.entity";

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

    @Column("boolean", {
        nullable: false,
        default: true,
        name: "is_active"
      })
      isActive: boolean;
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
    

    @ManyToOne(type=> StyleOrder, co=>co.customerorder,{nullable:false,})
    @JoinColumn({name:"co_id"})
    orderId:StyleOrder

    @ManyToOne(type=> CoLine, co=>co.CoBomInfo,{nullable:false,})
    @JoinColumn({name:"co_line_id"})
    coLineInfo:CoLine

}