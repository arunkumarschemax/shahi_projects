import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StyleEntity } from "./style-entity";
import { ItemEntity } from "./item-entity";

@Entity('z_factors')
export class ZFactorsEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;

    // @ManyToOne(type=> StyleEntity, style =>style.)
    // @JoinColumn({ name: 'style_id' })
    // styleEnityy:StyleEntity

    // @ManyToOne(type=> ItemEntity, item =>item.zFactorEntity)
    // @JoinColumn({ name: 'item_id' })
    // itemEntity:ItemEntity
}