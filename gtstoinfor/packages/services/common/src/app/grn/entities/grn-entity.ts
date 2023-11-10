import { PurchaseOrderStatus } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { GrnFabricEntity } from "./grn-fabric-entity";
import { GrnTrimsEntity } from "./grn-trims.entity";

@Entity('grn')
export class GrnEntity{
    @PrimaryGeneratedColumn('increment',{
        name:'grn_id'
    })
    grnId:number

    @Column('varchar',{
        name:'grn_number',
        nullable:false
    })
    grnNumber:string

    @Column('int',{
        name:'vendor_id',
        nullable:false
    })
    vendorId:number

    @Column('int',{
        name:'style_id',
        nullable:false
    })
    styleId:number

    @Column('int',{
        name:'po_id',
        nullable:false
    })
    poId:number

    @Column('date',{
        name:'grn_date',
        nullable:false
    })
    grnDate:Date

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
        default:1
      })
      isActive: boolean;

      @Column('enum',{
        name:'status',
        enum:PurchaseOrderStatus
      })
        status:PurchaseOrderStatus

    @Column('text',{
        name:'remarks',
        nullable:true
    })
    remarks:string
    
  @OneToMany(type => GrnFabricEntity, grnFab => grnFab.grnEntity, { cascade: true })
  grnFabricInfo: GrnFabricEntity[]

  @OneToMany(type => GrnTrimsEntity, grnTrim => grnTrim.grnEntity, { cascade: true })
  grnTrimInfo: GrnTrimsEntity[]


}