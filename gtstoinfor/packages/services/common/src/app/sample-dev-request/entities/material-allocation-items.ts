import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { MaterialStatusEnum } from "@project-management-system/shared-models";
import { MaterialAllocationEntity } from "./material-allocation.entity";

@Entity('material_allocation_items')
export class MaterialAllocationItemsEntity {
    @PrimaryGeneratedColumn("increment", {
        name: 'material_allocation_items_id'
    })
    materialAllocationItemsId: number;

      @Column("int", {
        nullable: false,
        name: "quantity",
        
    })
     quantity: number;

     @Column('int',{
        name:'stock_id',
        nullable:false,
      })
      stockId:number

      @Column('int',{
        name:'location_id',
        nullable:false,
      })
      LocationId:number

      @Column('int',{
        name:'allocate_quantity',
        nullable:false,
      })
      allocateQuantity:number

      @Column('int',{
        name:'buyer_id',
        nullable:false,
      })
      BuyerId:number


    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: string;

    @Column("varchar", {
        nullable: true,
        length: 40,
        name: "created_user",
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: string;

    @Column("varchar", {
        nullable: true,
        length: 40,
        name: "updated_user",
    })
    updatedUser: string | null;

    @VersionColumn({
        default: 1,
        name: "version_flag",
    })
    versionFlag: number;

    @Column({
        nullable: false,
        name: "is_active",
        default: 1
    })
    isActive: boolean;

    @ManyToOne(type => MaterialAllocationEntity, entity => entity.materialAllocationinfo,{nullable:false})
    @JoinColumn({name:'material_allocation_id'})
    materialAllocationItemInfo : MaterialAllocationEntity




}