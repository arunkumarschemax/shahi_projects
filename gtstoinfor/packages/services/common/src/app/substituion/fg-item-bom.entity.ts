import { ItemGroupEnum, RmItemTypeEnum, StatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('fg_item_bom')
export class FgItemBom{

    @PrimaryGeneratedColumn("increment",{
        name:'fg_item_bom_id'
    })
    fgItemBomId:number;

    @Column('int',{
        name:'fg_sku_id',
        nullable:false
    })
    fgSkuId: number;
    @Column('varchar',{
        name:'fg_sku',
        length:30,
        nullable:false
    })
    fgSku: string;

    @Column('int',{
        name:'rm_item_id',
        nullable:false
    })
    rmItemId: number;

    @Column('varchar',{
        name:'rm_item_code',
        nullable:false,
        length:25
    })
    rmItemCode : string;

    @Column('int',{
        name:'rm_sku_id',
        nullable:false,
    })
    rmSkuId : number;
    @Column('varchar',{
        name:'rm_sku',
        length:30,
        nullable:false,
    })
    rmSku : string;

    @Column('int',{
        name:'consumption',
        nullable:true,
    })
    consumption : number;

    @Column('int',{
        name:'item_type_id',
        nullable:false,
    })
    itemTypeId : number;

    @Column('int',{
        name:'item_group_id',
        nullable:false,
    })
    itemGroupeId : number;

    // @Column('enum',{
    //     name:'item_type',
    //     nullable:false,
    //     enum:RmItemTypeEnum
    // })
    // rmItemType : RmItemTypeEnum;

    @Column('enum',{
        name:'status',
        nullable:false,
        enum:StatusEnum,
        default:StatusEnum.OPEN
    })
    status : StatusEnum;

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

        @Column("boolean", {
            nullable: false,
            default: true,
            name: "is_active"
          })
          isActive: boolean;
}