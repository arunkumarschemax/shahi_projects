import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GrnEntity } from "./grn-entity";

@Entity('grn_trim')
export class GrnTrimsEntity{

    @PrimaryGeneratedColumn('increment',{
        name:'grn_trim_id'
    })
    grnTrimId:number

    @Column('int',{
        name:'product_group_id',
        nullable:false
    })
    productGroupId:number

    @Column('int',{
        name:'trim_id',
        nullable:false
    })
    trimId:number

    @Column('int',{
        name:'trim_code',
        nullable:false
    })
    trimCode:number


    @Column('text', {
        name: 'description',
        nullable: false
    })
    description: string

    @Column('decimal', {
        name: 'consumption',
        precision: 4,
        scale: 2,
    })
    consumption: number

    @Column('decimal', {
        name: 'received_qty',
        precision: 4,
        scale: 2,
    })
    receivedQty: number

    @Column('text', {
        name: 'remarks',
        nullable: true
    })
    remarks: string

    @ManyToOne(type =>GrnEntity,grn =>grn.grnTrimInfo)
    @JoinColumn({name:'grn_id'})
    grnEntity:GrnEntity

}