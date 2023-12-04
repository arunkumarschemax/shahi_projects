import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('address') 
export class AddressEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'address_id',
    })
    addressId: number

    @Column('varchar',{
        name:'country',
        nullable:false,
        length:50
    })
    country: string

    @Column('int',{
        name:'delivery_address',
        nullable:false,
    })
    deliveryAddress: number

    @Column('int',{
        name:'buyer_address',
        nullable:false,
    })
    buyerAddress: number

    @Column({
        nullable: false,
        name: "is_active",
        default:1
    })
    isActive: boolean;

    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'created_user'
    })
    createdUser: string | null;

    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'updated_user'
    })
    updatedUser: string | null;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;

    @VersionColumn({
        default: 1,
        name: "version_flag",
    })
    versionFlag: number;

    
}