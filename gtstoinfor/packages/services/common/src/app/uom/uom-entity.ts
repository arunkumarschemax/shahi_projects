import { UomCategoryEnum } from '@project-management-system/shared-models';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, OneToMany } from 'typeorm';
import { CoLine } from '../style-order/co-line.entity';
import { StyleOrder } from '../style-order/style-order.entity';
// import { CommonColumns } from '../../common/common-columns.entity';
// import { UomCategoryEnum } from '@transport-management-system/shared-models';

@Entity('uom')
export class UomEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    
    id: number;

    @Column('varchar',{
        name: 'uom',
        length:20,
        nullable:false
    })
    uom:string;

    @Column('enum',{
        name:'uom_category',
        enum: UomCategoryEnum
    })
    uomCategory: UomCategoryEnum;

    @Column('text',{
        name: 'description',
        nullable:false
    })
    description:string;

    
    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'created_user'
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'updated_user'
    })
    updatedUser: string | null;

    @VersionColumn({
        default: 1,
        name: 'version_flag'
    })
    versionFlag: number;

    @Column('boolean', {
        nullable: false,
        name: 'is_active',
        default: true
    })
    isActive: boolean;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'created_user_id'
    })
    createdUserId: number | null;
    
    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'updated_user_id'
    })
    updatedUserId: number | null;

    @OneToMany(type=>CoLine, co=>co.uomInfo,{cascade: true})
    coLineInfo:CoLine;

    @OneToMany(type=>StyleOrder, co=>co.uomInfo,{cascade: true})
    styleOrderInfo:StyleOrder;
}