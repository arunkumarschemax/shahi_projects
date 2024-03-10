import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('sizeht_matrix')
export class SizehtMatrixEntity{
        @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;
    @Column('varchar', {
        name: 'im_code',
        nullable: true
    })
    imCode: string

    @Column('varchar', {
        name: 'fit',
        nullable: true
    })
    fit: string

    @Column('varchar', {
        name: 'style',
        nullable: true
    })
    style: string

        
    @Column('varchar', {
        name: 'ht_color',
        nullable: true
    })
    htColor: string

    @Column('varchar', {
        name: 'fabric_code',
        nullable: true
    })
    fabricCode: string

    @Column('varchar', {
        name: 'fabric_content',
        nullable: true
    })
    fabricContent: string

    @Column('varchar', {
        name: 'fabric_combinations',
        nullable: true
    })
    fabricCombinations: string
    
}