import { StatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { FabricRequestQualitiesEntity } from "./fabric-request-qualities.entity";

@Entity('fabric_request')
export class FabricRequestEntity {

    @PrimaryGeneratedColumn("increment", { name: 'fabric_request_id' })
    fabricRequestId: number;
  
    @Column("int", {
      nullable: false,
      name: "location_id"
    })
    locationId: number;

    @Column("int", {
        nullable: false,
        name: "request_no"
      })
    requestNo: number;       //  Auto Generate

    @Column("int", {
        nullable: true,
        name: "style_id"
      })
    styleId: number;

    @Column("int", {
        nullable: false,
        name: "pch_id"
      })
    pchId: number;

    @Column("int", {
        nullable: false,
        name: "buyer_id"
      })
    buyerId: number;

    @Column("varchar", {
        nullable: false,
        name: "type"
      })
    type: string;

    @Column("int", {
        nullable: true,
        name: "sample_type_id"
      })
    sampleTypeId: number;

    @Column('varchar', {
        name: 'remarks',
    })
    remarks: string;

    @Column('int', {
        name: 'fabric_responsible',
        nullable: true
    })
    fabricResponsible: number;

    @Column("int", {
        nullable: false,
        name: "facility_id"
      })
    facilityId: number;

    @Column('varchar', {
        name: 'light_source_primary',
        nullable: true
    })
    lightSourcePrimary: string;

    @Column('varchar', {
        name: 'light_source_secondary',
        nullable: true
    })
    lightSourceSecondary: string;

    @Column('varchar', {
        name: 'light_source_tertiary',
        nullable: true
    })
    lightSourceTertiary: string;

    @Column('enum', {
        name: 'status',
        nullable: false,
        enum: StatusEnum
    })
    status: StatusEnum;


    @Column('varchar', {
        name: 'file_name',
        nullable: true
    })
    fileName: string;

    @Column('varchar', {
        name: 'file_path',
        nullable: true
    })
    filePath: string;

    @CreateDateColumn({
      name: "created_at",
      type: "datetime"
    })
    createdAt: Date;
  
    @Column("varchar", {
      nullable: true,
      name: "created_user"
    })
    createdUser: string | null;
  
  
    @UpdateDateColumn({
      name: "updated_at",
      type: 'datetime'
    })
    updatedAt: Date;
  
    @Column("varchar", {
      nullable: true,
      name: "updated_user"
    })
    updatedUser: string | null;
  
  
    @VersionColumn({
      default: 1,
      name: "version_flag"
    })
    versionFlag: number;

    @OneToMany(() => FabricRequestQualitiesEntity, Entity => Entity.data, { cascade: true })
    fabricQuantityEntity:FabricRequestQualitiesEntity[]

  
  }
  