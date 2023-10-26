import { ItemGroupEnum } from "@project-management-system/shared-models";
import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";


@Entity('item-group')
export class ItemGroup{

    @PrimaryGeneratedColumn("increment", { name: 'item_group_id' })
    itemGroupId: number;


    @Column('enum', {
        name: 'item_group',
        enum: ItemGroupEnum
    })
    itemGroup: ItemGroupEnum;

  
    @Column("boolean",{
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
        nullable: true,
        name: "created_user"
    })
    createdUser: string | null;
    
    @UpdateDateColumn({
        name: "updated_at",
        type:'datetime'
    })
    updatedAt: Date;
    
    @Column("varchar", {
        nullable: true,
        name: "updated_user"
    })
    updatedUser: string | null;
    
    @VersionColumn({
        default:1,
        name: "version_flag"
    })
    versionFlag: number;
}