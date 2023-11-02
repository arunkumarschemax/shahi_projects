import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, JoinColumn } from "typeorm";
import { OperationSequence } from "../../operation-sequence/operation-sequence.entity";
import { Style } from "../../style/dto/style-entity";
import { TrackingEnum } from "@project-management-system/shared-models";

@Entity('operation_tracking')
export class OperationTracking {

  @PrimaryGeneratedColumn("increment",{name:'operation_tracking_id'})
  operationTrackingId:number;
   
  @ManyToOne(type=>Style, style=>style.tracking,{  nullable:false, })
  @JoinColumn({ name:"style_id"})
  style: Style;

  @ManyToOne(type=>OperationSequence, sequence=>sequence.tracking,{  nullable:false, })
  @JoinColumn({ name:"operation_sequence_id"})
  operationSequence: OperationSequence;

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

@Column('varchar',{
    nullable:false,
    name:'issued_uom'
})
issuedUom:string;

  @Column('int',{
    nullable:false,
    name:'damaged_quantity'
})
damagedQuantity:number;

@Column('varchar',{
    nullable:false,
    name:'damaged_uom'
})
damagedUom:string;

  @Column('int',{
    nullable:false,
    name:'reported_quantity'
})
reportedQuantity:number;

@Column('varchar',{
    nullable:false,
    name:'reported_uom'
})
reportedUom:string;

@Column('int',{
    nullable:false,
    name:'rejected_quantity'
})
rejectedQuantity:number;

@Column('varchar',{
    nullable:false,
    name:'rejected_uom'
})
rejectedUom:string;

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
