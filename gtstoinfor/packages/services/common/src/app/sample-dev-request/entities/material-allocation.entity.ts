import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { MaterialStatusEnum } from "@project-management-system/shared-models";

@Entity('material_allocation')
export class MaterialAllocationEntity {
    @PrimaryGeneratedColumn("increment", {
        name: 'material_allocation_id'
    })
    materialAllocationId: number;

    @Column("varchar", {
        nullable: false,
        name: "item_type",
        
    })
    itemType: string;

    @Column('int',{
        name:'sample_order_id',
        nullable:false,
      })
      sampleOrderId:number

      
    @Column('int',{
        name:'sample_item_id',
        nullable:false,
      })
      sampleItemId:number

      @Column('int',{
        name:'m3_item_id',
        nullable:false,
      })
      m3ItemId:number

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

      
   @Column("enum", {
    name: "status",
    enum: MaterialStatusEnum
  })
   status: MaterialStatusEnum;


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

}