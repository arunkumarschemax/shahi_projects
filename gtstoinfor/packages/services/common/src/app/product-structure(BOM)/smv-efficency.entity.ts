import { Column, CreateDateColumn, Entity,PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('smv-efficiency')
export class SMVEfficiencyEntity {

    @PrimaryGeneratedColumn("increment", { name: 'smv_efficiency_id' })
    SmvEfficiencyId: number;
  
    @Column("int", {
      nullable: false,
      name: "operation_id"
    })
    operationId: number;

    @Column("varchar", {
        nullable: false,
        name: "capacity_type"
      })
    capacityType: string;       

    @Column("datetime", {
        nullable: false,
        name: "valid_from_date"
      })
    validFromDate: Date;

    @Column("datetime", {
        nullable: false,
        name: "valid_to_date"
      })
      validToDate: Date;


    @Column("varchar", {
        nullable: false,
        name: "revision_no"
      })
    revisionNo: string;

    @Column("varchar", {
        nullable: false,
        name: "work_center"
      })
    workCenter: string;

    @Column("varchar", {
        nullable: false,
        name: "operation_description"
      })
    operationDescription: string;

    @Column("int", {
        nullable: false,
        name: "department_id"
      })
    departmentId: number;


    @Column("varchar", {
        nullable: false,
        name: "planing_area"
      })
    planingArea: string;

      @Column("varchar", {
        nullable: false,
        name: "run_time"
      })
    runTime: string;

      @Column("varchar", {
        nullable: false,
        name: "price_time_qty"
      })
      priceTimeQty: string;

      @Column("varchar", {
        nullable: false,
        name: "setup_time"
      })
      setupTime: string;

      @Column("varchar", {
        nullable: false,
        name: "external_setup"
      })
      externalSetup: string;

      @Column("varchar", {
        nullable: false,
        name: "fixed_time"
      })
      fixedTime: string;

      @Column("varchar", {
        nullable: false,
        name: "plnno_machine"
      })
      plnnoMachine: string;

      @Column("varchar", {
        nullable: false,
        name: "plnno_workers"
      })
      plnnoWorkers: string;

      @Column("varchar", {
        nullable: false,
        name: "plnno_setup"
      })
      plnnoSetup: string;

      @Column("varchar", {
        nullable: false,
        name: "plnno_op_mtd"
      })
      phantom: string;

      @Column("varchar", {
        nullable: false,
        name: "leadtm_offset"
      })
      leadtmOffset: string;

      @Column("varchar", {
        nullable: false,
        name: "p_days"
      })
      pdays: string;

      @Column("varchar", {
        nullable: false,
        name: "options_percent"
      })
      optionsPercent: string;

      @Column("varchar", {
        nullable: false,
        name: "scrap_pct"
      })
      scrapPct: string;

      @Column("varchar", {
        nullable: false,
        name: "setup_scrap"
      })
      setupScrap: string;

      @Column("varchar", {
        nullable: false,
        name: "document_id"
      })
      documentId: string;

      @Column("varchar", {
        nullable: false,
        name: "tool_no"
      })
      toolNo: string;

      @Column("varchar", {
        nullable: false,
        name: "subcontr_ctrl"
      })
      subcontrCtrl: string;

      @Column("varchar", {
        nullable: false,
        name: "finite"
      })
      finite: string;

      @Column("varchar", {
        nullable: false,
        name: "qty_per_hour"
      })
      qtyPerHour: string;

      @Column("varchar", {
        nullable: false,
        name: "crit_resource"
      })
      critResource: string;

      @Column("varchar", {
        nullable: false,
        name: "add_mtrl_offset"
      })
      addMtrlOffset: string;

     @Column("varchar", {
        nullable: false,
        name: "shipping_buffer"
      })
    shippingBuffer: string;



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
  