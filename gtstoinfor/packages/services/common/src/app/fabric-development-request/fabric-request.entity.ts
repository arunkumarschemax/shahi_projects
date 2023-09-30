import { StatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

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
        nullable: false,
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

    @Column("int", {
        nullable: false,
        name: "fabric_type_id"
      })
    fabricTypeId: number;

    @Column("int", {
        nullable: false,
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
    FileName: string;

    @Column('varchar', {
        name: 'file_path',
        nullable: true
    })
    FilePath: string;

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

  
  }
  