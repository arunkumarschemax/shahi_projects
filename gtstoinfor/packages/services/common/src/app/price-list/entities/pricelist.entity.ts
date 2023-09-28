import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('price_list') 
export class PriceListEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
    })
    id: number

    @Column('varchar', {
        name: "year",
    })
    year: string;

    @Column('varchar', {
        name: "season",
        
    })
    seasonCode: string;

    @Column('varchar', {
        name: "item",
        
    })
    item: string;

    @Column('varchar', {
        name: "sample_code",
       
    })
    sampleCode: string;

    @Column('varchar', {
        name: "business",
       
    })
    business: string;

    @Column('varchar', {
        name: "fob_local_currency",
       
    })
    fobLocalCurrency: string;

    @Column('varchar', {
        name: "currency",  
    })
    currency: string;

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

    @Column({
        nullable: false,
        name: "is_active",
        default:1
      })
      isActive: boolean;

    @Column('int', {
        nullable: true,
        name: 'version',
    })
    version: number;
    
    @Column('int', {
        nullable:true,
        name: 'file_id',
    })
    fileId : number;

}