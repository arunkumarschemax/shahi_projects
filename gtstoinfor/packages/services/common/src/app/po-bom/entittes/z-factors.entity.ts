import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StyleEntity } from "./style-entity";
import { ItemEntity } from "./item-entity";

@Entity('z_factors')
export class ZFactorsEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;

      @Column('varchar', {
        nullable:true,
        name: 'actual_im',
        length: 50,
    })
    actualIM: string

    // @Column('int', {
    //     name: 'bom_id'
    // })
    // bomId: number;

    // @Column('int', {
    //     name: 'style_id'
    // })
    // styleId: number;

    // @Column('int', {
    //     name: 'item_id'
    // })
    // itemId: number;

    // @Column('varchar', {
    //     name: 'z_factor',
    //     length: 50,
    // })
    // zFactor: string

    // @Column('varchar', {
    //     name: 'z_factor_value',
    //     length: 50,
    // })
    // zFactorValue: string

    // @Column('varchar', {
    //     name: 'action',
    //     length: 50,
    // })
    // action: string

    // @Column('varchar', {
    //     nullable:true,
    //     name: 'actual_im',
    //     length: 50,
    // })
    // actualIM: string

    // @Column('varchar', {
    //     nullable:true,
    //     name: 'replaced_im',
    //     length: 50,
    // })
    // replacedIM: string





    // @ManyToOne(type=> StyleEntity, style =>style.)
    // @JoinColumn({ name: 'style_id' })
    // styleEnityy:StyleEntity

    // @ManyToOne(type=> ItemEntity, item =>item.zFactorEntity)
    // @JoinColumn({ name: 'item_id' })
    // itemEntity:ItemEntity
}