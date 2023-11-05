import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('substituion')
export class Substitution{

    @PrimaryGeneratedColumn("increment",{
        name:'substituion_id'
    })
    substituionId:number;

    @Column('varchar',{
        name:'fg_item_code',
        nullable:false,
        length:25
    })
    fgItemCode : string;

    @Column('varchar',{
        name:'rm_item_code',
        nullable:false,
        length:25
    })
    rmItemCode : string;

    @Column('int',{
        name:'fg_item_id',
        nullable:false,
    })
    fgItemId : number;

    @Column('int',{
        name:'rm_item_id',
        nullable:false,
    })
    rmItemId : number;

    @Column('varchar',{
        name:'fg_sku',
        nullable:false,
        length:25
    })
    fgSku : string;

    @Column('int',{
        name:'fg_sku_id',
        nullable:true,
    })
    fgSkuId : number;

    @Column('varchar',{
        name:'rm_sku',
        nullable:false,
        length:25
    })
    rmSku : string;

    @Column('int',{
        name:'rm_sku_id',
        nullable:true,
    })
    rmSkuId : number;
    
    @CreateDateColumn({
    name: "created_at",
    type:"datetime"
    })
    createdAt: Date;

    @Column("varchar", {
        nullable: false,
        name: "created_user",
        default:"ADMIN",
        length:50
    })
    createdUser: string | null;


    @UpdateDateColumn({
        name: "updated_at",
        type:'datetime'
    })
    updatedAt: Date;

    @Column("varchar", {
        nullable: true,
        name: "updated_user",
        length:50
    })
    updatedUser: string | null;

    @VersionColumn({
        default:1,
        name: "version_flag"
    })
    versionFlag: number;

}