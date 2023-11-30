import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, JoinColumn } from "typeorm";
import { OperationSequence } from "../../operation-sequence/operation-sequence.entity";
import { Style } from "../../style/dto/style-entity";
import { TrackingEnum } from "@project-management-system/shared-models";

@Entity('operation_tracking')
export class OperationTracking {

  @PrimaryGeneratedColumn("increment",{name:'operation_tracking_id'})
  operationTrackingId:number;

  @Column('varchar',{
    nullable:false,
    name:'job_number'
    })
    jobNumber:string;

    @Column('int',{
      nullable:false,
      name:'style_id'
  })
  styleId:number;
  
  @Column('int',{
    nullable:false,
    name:'operation_sequence_id'
  })
  operationSequenceId:number;
   
  // @ManyToOne(type=>Style, style=>style.tracking,{  nullable:false, })
  // @JoinColumn({ name:"style_id"})
  // style: Style;

  // @ManyToOne(type=>OperationSequence, sequence=>sequence.tracking,{  nullable:false, })
  // @JoinColumn({ name:"operation_sequence_id"})
  // operationSequence: OperationSequence;

  @Column('int',{
    nullable:false,
    name:'operation_inventory_id'
})
operationInventoryId:number;

  @Column('varchar',{
    nullable:false,
    name:'operation'
})
operation:string;

@Column('varchar',{
    nullable:false,
    name:'next_operation'
})
nextOperation:string;

  @Column('int',{
    nullable:false,
    name:'issued_quantity'
})
issuedQuantity:number;

@Column('int',{
    nullable:false,
    name:'issued_uom_id'
})
issuedUomId:number;
@Column('int',{
  nullable:false,
  name:'sample_req_id'
})
sampleReqId:number;

//   @Column('int',{
//     nullable:false,
//     name:'damaged_quantity'
// })
// damagedQuantity:number;

// @Column('varchar',{
//     nullable:false,
//     name:'damaged_uom_id'
// })
// damagedUomId:number;

  @Column('int',{
    nullable:false,
    name:'reported_quantity'
})
reportedQuantity:number;

@Column('int',{
    nullable:false,
    name:'reported_uom_id'
})
reportedUomId:number;

@Column('int',{
    nullable:false,
    name:'rejected_quantity'
})
rejectedQuantity:number;

@Column('int',{
    nullable:true,
    name:'rejected_uom_id'
})
rejectedUomId:number | null;

@Column('enum',{
    nullable:false,
    name: 'status',
    enum: TrackingEnum
})
status:TrackingEnum;

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
