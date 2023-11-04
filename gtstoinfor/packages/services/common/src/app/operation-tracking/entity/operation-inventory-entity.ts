import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, JoinColumn } from "typeorm";
import { OperationSequence } from "../../operation-sequence/operation-sequence.entity";
import { Style } from "../../style/dto/style-entity";

@Entity('operation_inventory')
export class OperationInventory {

  @PrimaryGeneratedColumn("increment",{
    name:'operation_inventory_id'
})
  operationIssuingId:number;

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

  @Column('int', {
    nullable: false,
    name: 'physical_quantity'
  })
  physicalQuantity: number;

  @Column('varchar', {
    nullable: false,
    name: 'physical_uom'
  })
  physicalUom: string;

  @Column('int', {
    nullable: false,
    name: 'issued_quantity'
  })
  issuedQuantity: number;

@Column('int',{
    nullable:false,
    name:'issued_uom_id'
})
issuedUomId:number;

  @Column('int', {
    nullable: false,
    name: 'damaged_quantity'
  })
  damagedQuantity: number;

@Column('int',{
    nullable:false,
    name:'damaged_uom_id'
})
damagedUomId:number;

  @Column('int', {
    nullable: false,
    name: 'rejected_quantity'
  })
  rejectedQuantity: number;

@Column('int',{
    nullable:false,
    name:'rejected_uom_id'
})
rejectedUomId:number;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime"
  })
  createdAt: Date;

  @Column("varchar", {
    nullable: false,
    name: "created_user",
    default: "ADMIN",
    length: 50
  })
  createdUser: string | null;

  @UpdateDateColumn({
    name: "updated_at",
    type: 'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "updated_user",
    length: 50
  })
  updatedUser: string | null;

  @VersionColumn({
    default: 1,
    name: "version_flag"
  })
  versionFlag: number;


}
