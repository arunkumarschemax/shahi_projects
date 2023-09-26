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
        name: "season_code",
        
    })
    seasonCode: string;

    @Column('varchar', {
        name: "item",
        
    })
    item: string;

    @Column('varchar', {
        name: "style",
       
    })
    style: string;

    @Column('varchar', {
        name: "destination",
       
    })
    destination: string;

    @Column('varchar', {
        name: "price",
       
    })
    price: string;

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

    @Column('int', {
        nullable: true,
        name: 'version',
    })
    version: number;

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

}