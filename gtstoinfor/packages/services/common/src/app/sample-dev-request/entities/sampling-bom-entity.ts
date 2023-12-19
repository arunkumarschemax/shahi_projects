import { StatusEnum } from "packages/libs/shared-models/src/enum";
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
        name:'m3_item_id',
        nullable:false
    })
    m3ItemId:number

    @Column('varchar',{
        name:'item_type',
        nullable:false
    })
    itemType:string

    @Column('int',{
        name:'colour_id',
        nullable:false
    })
    colourId:number

    @Column('decimal',{
      name:'required_quantity',
    nullable:false,
    })
    requiredQuantity : number;

    @Column('decimal',{
      name:'received_quantity',
    nullable:false,
    })
    receivedQuantity : number;

    @Column('decimal',{
      name:'assigned_quantity',
    nullable:false,
    })
    assignedQuantity : number;

    @Column({
      type:"enum",
      enum: StatusEnum,
      default:StatusEnum.OPEN,
      nullable: true,
      name: "status"
    })
    status: string;


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