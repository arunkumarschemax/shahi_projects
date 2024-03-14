import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm"

@Entity('apa_size_matrix')
export class ApiSizeMatrix {
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    Id: number;

    @Column('varchar', {
        name: 'buy_month',
        length: 50,
    })
    buyMonth: string

    @Column('varchar', {
        name: 'fd_of',
        length: 50,
    })
    fdOf: string

    @Column('varchar', {
        name: 'style_number',
        length: 50,
    })
    styleNumber: string

    @Column('varchar', {
        name: 'style_type',
        length: 50,
    })
    styleType: string

    @Column('varchar',{
        name:'usa_size',
    })
    usaSize:string

    @Column('varchar',{
        name:'china_size_matrixtype',
    })
    chinaSizeMatrixtype:string


    @Column('varchar', {
        name: 'china_top_size',
    })
    chinaTopSize: string


    @Column('varchar', {
        name: 'china_top_bodysize',
    })
    chinaTopBodySize: string
    

    @Column('varchar', {
        name: 'china_bottom_size',
    })
    chinaBottomSize: string

    @Column('varchar', {
        name: 'china_bottom_bodysize',
    })
    chinaBottomBodySize: string

    @Column('varchar', {
        name: 'korea_size_matrixtype',
    })
    koreaSizeMatrixtype: string


    @Column('int', {
        name: 'korea_top_generic',
    })
    koreaTopGeneric: string

    @Column('int', {
        name: 'korea_top_chest',
    })
    koreaTopChest: string

    @Column('int', {
        name: 'korea_top_height',
    })
    koreaTopHeight: string

    @Column('int', {
        name: 'korea_bottom_generic',
    })
    koreaBottomGeneric: string

    @Column('int', {
        name: 'korea_bottom_waist',
    })
    koreaBottomWaist: string


    @Column('int', {
        name: 'korea_bottom_hip',
    })
    koreaBottomHip: string

    
}