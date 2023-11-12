import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Style } from '../../style/dto/style-entity';
import { LocationEntity } from '../../locations/location.entity';
import { ProfitControlHead } from '../../profit-control-head/profit-control-head-entity';
import { Buyers } from '../../buyers/buyers.entity';
import { SampleTypes } from '../../sample Types/sample-types.entity';
import { SampleSubTypes } from '../../sample-sub-types/sample-sub-types.entity';
import { Brands } from '../../master-brands/master-brands.entity';
import { SampleDevelopmentStatusEnum } from '@project-management-system/shared-models';
import { EmplyeeDetails } from '../../employee-details/dto/employee-details-entity';
import { type } from 'os';
import { SampleReqSizeEntity } from './sample-requset-size-info-entity';
import { SampleReqFabricinfoEntity } from './sample-request-fabric-info-entity';
import { SampleRequestTriminfoEntity } from './sample-request-trim-info-entity';
import { SampleRequestProcessInfoEntity } from './sample-request-process-info-entity';

@Entity('sample_request')
export class SampleRequest {

  @PrimaryGeneratedColumn("increment", {
    name: 'sample_request_id'
  })
  SampleRequestId: number;

  // @ManyToOne(() => Location, location => location.sampleReq, { nullable: false })
  // @JoinColumn({ name: 'location_id' })
  // location: Location;

  @Column('varchar',{
    name:'location_id',
    nullable:true
  })
  locationId:string

  @Column('varchar', {
    name: 'request_no',
    length: 30,
    nullable: false
  })
  requestNo: string;

  @ManyToOne(() => ProfitControlHead, pch => pch.sampleReq, { nullable: false })
  @JoinColumn({ name: 'profit_control_head_id' })
  pch: ProfitControlHead;

  @Column("varchar", {
    nullable: false,
    name: "user"
  })
  user: string;

  @ManyToOne(() => Buyers, buyers => buyers.sampleReq, { nullable: false })
  @JoinColumn({ name: 'buyer_id' })
  buyer: Buyers;

  @ManyToOne(() => SampleTypes, sampleTypes => sampleTypes.sampleReq, { nullable: false })
  @JoinColumn({ name: 'sample_type_id' })
  sampleType: SampleTypes;

  @ManyToOne(() => SampleSubTypes, sampleSubType => sampleSubType.sampleReq, { nullable: false })
  @JoinColumn({ name: 'sample_sub_type_id' })
  sampleSubType: SampleSubTypes;

  @ManyToOne(() => Style, style => style.sampleReq, { nullable: false })
  @JoinColumn({ name: 'style_id' })
  style: Style;

  @Column("varchar", {
    nullable: false,
    name: "description"
  })
  description: string;

  @ManyToOne(() => Brands, brands => brands.sampleReq, { nullable: false })
  @JoinColumn({ name: 'brand_id' })
  brand: Brands;

  @Column("varchar", {
    nullable: false,
    name: "cost_ref"
  })
  costRef: string;

  @Column("varchar", {
    nullable: false,
    name: "m3_style_no",
    length: 150
  })
  m3StyleNo: string;

  @Column("varchar", {
    nullable: false,
    length: 10,
    name: "contact"
  })
  contact: string;

  @Column("varchar", {
    nullable: false,
    name: "extension"
  })
  extension: string;

  @Column("int", {
    nullable: false,
    name: "sam_value"
  })
  samValue: number;

  @ManyToOne(() => EmplyeeDetails, employee => employee.sampleReq, { nullable: false })
  @JoinColumn({ name: 'dmm_id' })
  dmm: EmplyeeDetails;

  @ManyToOne(() => EmplyeeDetails, employee => employee.sampleRequest, { nullable: false })
  @JoinColumn({ name: 'technician_id' })
  technician: EmplyeeDetails;

  @Column("int", {
    nullable: false,
    name: "product"
  })
  product: number;

  @Column("varchar", {
    nullable: false,
    name: "type"
  })
  type: string;

  @Column("varchar", {
    nullable: false,
    name: "conversion"
  })
  conversion: string;

  @Column("int", {
    nullable: false,
    name: "made_in"
  })
  madeIn: number;

  @Column("int", {
    nullable: false,
    name: "facility_id"
  })
  facilityId: number;

  @Column('varchar', {
    name: 'remarks',
    nullable: false,
  })
  remarks: string;

  @Column('enum', {
    name: 'status',
    nullable: false,
    enum: SampleDevelopmentStatusEnum
  })
  status: SampleDevelopmentStatusEnum;

  @Column('varchar', {
    name: 'file_name',
    length: 200,
    nullable: false
  })
  
  fileName: string;
  @Column('varchar', {
    name: 'file_path',
    length: 200,
    nullable: false
  })
  filepath: string;

  @OneToMany(type => SampleReqSizeEntity, sampleReqSize => sampleReqSize.samplerReqEntity, { cascade: true })
  sampleReqSizeInfo: SampleReqSizeEntity[]


  @OneToMany(type => SampleReqFabricinfoEntity, sampleReqFabric => sampleReqFabric.samplerReqFabricEntity, { cascade: true })
  sampleReqFabricInfo: SampleReqFabricinfoEntity[]

  @OneToMany(type => SampleRequestTriminfoEntity, sampleReqTrimInfo => sampleReqTrimInfo.sampleDevReqInfo, { cascade: true })
  sampleTrimInfo: SampleRequestTriminfoEntity[]

  @OneToMany(type => SampleRequestProcessInfoEntity, sampleReqTrim => sampleReqTrim.sampleReq, { cascade: true })
  sampleProcessInfo: SampleRequestProcessInfoEntity[]
}
