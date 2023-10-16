import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('production-track')
export class ProductionTrack{
    @PrimaryGeneratedColumn('increment',{
        name:'production_track_id'
    })
    productionTrackId:number;

    @Column('varchar',{
        name:'fg_item_code',
        nullable:false,
        length:30
    })
    fgItemCode: string

    @Column('varchar',{
        name:'style_code',
        nullable:false,
        length:30
    })
    styleCode: string

    @Column('int',{
        name:'co_number',
        nullable:false,
    })
    coNumber: number

    @Column('int',{
        name:'co_line_number',
        nullable:false,
    })
    coLineNumber: number

    @Column('varchar',{
        name:'operation',
        nullable:false,
        length:50
    })
    operation: string

    @Column('varchar',{
        name:'next_operation',
        nullable:false,
        length:50
    })
    nextOperation: string

    @Column('int',{
        name:'issued_quantity',
        nullable:false,
    })
    issuedQuantity: string
}