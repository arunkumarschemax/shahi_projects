import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('address') 
export class AddressEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'address_id',
    })
    addressId: number

    @Column("text",{
        name:'bill_to',
        nullable:false,
        
    })
    billTo: string

    
    @Column("text",{
        name:'buyer_address',
        nullable:false,
        
    })
    buyerAddress: string

    @Column('int',{
        name:'buyer_code',
        nullable:false,
       
    })
    buyerCode: number

    @Column('text',{
        name:'delivery_address',
        nullable:false,
    })
    deliveryAddress: string

    @Column('int',{
        name:'delivery_code',
        nullable:false,
       
    })
    deliveryCode: number

    @Column("text",{
        name:'ship_to',
        nullable:false,
        
    })
    shipTo: string


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