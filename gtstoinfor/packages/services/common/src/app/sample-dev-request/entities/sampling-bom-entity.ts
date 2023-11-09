import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('sampling_bom')
export class SamplingbomEntity {
    @PrimaryGeneratedColumn('increment',{name:'sampling_bom_id'})
    samplingBomId:number

    @Column('int',{
        name:'sample_request_id',
        nullable:false
    })
    sampleRequestId:number

    @Column('int',{
        name:'product_group_id',
        nullable:false
    })
    productGroupId:number

    @Column('int',{
        name:'rm_item_id',
        nullable:false
    })
    rmItemId:number

    @Column('int',{
        name:'fabric_id',
        nullable:false
    })
    fabricId:string

    @Column('int',{
        name:'colour_id',
        nullable:false
    })
    colourId:number

    @Column('int',{
        name:'required_quantity',
        nullable:false
    })
    requiredQuantity:number

    @Column('int',{
        name:'received_quantity',
        nullable:false
    })
    receivedQuantity:number

    @Column('int',{
        name:'assigned_quantity',
        nullable:false
    })
    assignedQuantity:number

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
}