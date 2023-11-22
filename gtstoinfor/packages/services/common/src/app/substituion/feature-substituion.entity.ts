import { StatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ItemCreation } from "../fg-item/item_creation.entity";
import { RmCreationEntity } from "../rm-items/rm-items.entity";
import { FeatureEntity } from "../feature-creation/entities/feature.entity";
import { RmSkus } from "../rm-skus/rm-sku.entity";

@Entity('feature_substitution')
export class FeatureSubstitution{
    @PrimaryGeneratedColumn('increment',{
        name:'feature_substitution_id'
    })
    featureSubstitutionId: number;

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

    @Column('varchar',{
        name:'rm_sku_code',
        nullable:false,
        length:25
    })
    rmSkuCode : string;

    @Column('varchar',{
        name:'feature_code',
        nullable:false,
        length:25
    })
    featureCode : string;

    @Column('varchar',{
        name:'fg_option',
        nullable:false,
        length:25
    })
    fgOption : string;

    @Column('varchar',{
        name:'fg_option_value',
        nullable:false,
        length:25
    })
    fgOptionValue : string;

    @Column('varchar',{
        name:'rm_option',
        nullable:false,
        length:25
    })
    rmOption : string;

    @Column('varchar',{
        name:'rm_option_value',
        nullable:false,
        length:25
    })
    rmOptionValue : string;

    @Column('enum',{
        name:'status',
        nullable:false,
        enum:StatusEnum
    })
    status : StatusEnum;

    @Column("boolean",{
        nullable:false,
        default:true,
        name:"is_active"
    })
    isActive:boolean;

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

    @ManyToOne(type => ItemCreation, fgi => fgi.featureSubstitutionInfo,{nullable:false})
    @JoinColumn({name:'fg_item_id'})
    fgItemInfo: ItemCreation

    @ManyToOne(type => RmCreationEntity, fgi => fgi.featureSubstitutionInfo,{nullable:false})
    @JoinColumn({name:'rm_item_id'})
    rmItemInfo: RmCreationEntity

    @ManyToOne(type => FeatureEntity, fgi => fgi.featureSubstitutionInfo,{nullable:false})
    @JoinColumn({name:'feature_id'})
    featureInfo: FeatureEntity

    @ManyToOne(type => RmSkus, rms => rms.featureSubstitutionInfo,{nullable: false})
    @JoinColumn({name:'rm_sku_id'})
    rmSkuInfo: RmSkus

    
}