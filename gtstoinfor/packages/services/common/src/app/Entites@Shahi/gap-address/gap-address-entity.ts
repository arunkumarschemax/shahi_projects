import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('gap_address')
export class GapAddressEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'address_id',
    })
    addressId: number

    @Column('varchar', {
        name: 'destination'
    })
    destination: string


    @Column("text", {
        name: 'buyer_address',
        nullable: false,

    })
    buyerAddress: string

    @Column('int', {
        name: 'buyer_address_code',
        nullable: false,

    })
    buyerAddressCode: number

    @Column('text', {
        name: 'delivery_address',
        nullable: false,
    })
    deliveryAddress: string

    @Column('int', {
        name: 'delivery_address_code',
        nullable: false,

    })
    deliveryAddressCode: number


    @Column({
        nullable: false,
        name: "is_active",
        default: 1
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