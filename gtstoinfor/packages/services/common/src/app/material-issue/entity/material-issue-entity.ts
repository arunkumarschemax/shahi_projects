import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn,ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { MaterialFabricEntity } from "./material-fabric-entity";
import { MaterialTrimEntity } from "./material-trim-entity";

@Entity('material_issue')
export class MaterialIssueEntity{
    @PrimaryGeneratedColumn('increment',{
        name:'material_issue_id'
    })
    materialIssueId:number;

    @Column('varchar',{
        nullable:false,
        name:'consumption_code'
    })
    consumptionCode:string;

    @Column('varchar',{
        nullable:false,
        name:'request_no'
    })
    requestNo:string;

    @Column('varchar',{
        nullable:false,
        name:'po_number'
    })
    poNumber:string;

    @Column({
        nullable: false,
        name: 'issue_date',
        type: 'date',
    })
    issueDate: Date;
    

    @Column('int',{
        nullable:false,
        name:'location_id'
    })
    locationId:number;

    @Column('int',{
        nullable:false,
        name:'pch_id'
    })
    pchId:number;

    @Column('int',{
        nullable:false,
        name:'buyer_id'
    })
    buyerId:number;

    @Column('int',{
        nullable:false,
        name:'sample_type_id'
    })
    sampleTypeId:number;
    
    @Column('int',{
        nullable:false,
        name:'sample_sub_type_id'
    })
    sampleSubTypeId:number;

    @Column('varchar',{
        nullable:false,
        name:'style_no'
    })
    styleNo:string;

    @Column('int',{
        nullable:false,
        name:'brand_id'
    })
    brandId:number;

    @Column('int',{
        nullable:false,
        name:'dmm_id'
    })
    dmmId:number;

    @Column('int',{
        nullable:false,
        name:'technician_id'
    })
    technicianId:number;

    @Column('varchar',{
        nullable:false,
        name:'description',
        length: 255
    })
    description:string;

    @Column('varchar',{
        nullable:false,
        name:'cost_ref'
    })
    costRef:string;

    @Column('varchar',{
        nullable:false,
        name:'m3_style_no'
    })
    m3StyleNo:string;

    @Column("varchar",{
        nullable:false,
        length:10,
        name:"contact"
      })
      contact:string;

    @Column('varchar',{
        nullable:false,
        name:'extn'
    })
    extn:string;

    @Column('int',{
        nullable:false,
        name:'SAM'
    })
    SAM:number;

    @Column('varchar',{
        nullable:false,
        name:'product'
    })
    product:string;

    @Column('varchar',{
        nullable:false,
        name:'type'
    })
    type:string;

    @Column('varchar',{
        nullable:false,
        name:'conversion'
    })
    conversion:string;

    @Column('varchar',{
        nullable:false,
        name:'made_in'
    })
    madeIn:string;

    @Column('varchar',{
        nullable:false,
        name:'remarks',
        length: 255
    })
    remarks:string;

    @CreateDateColumn({
    name: "created_at",
    type:"datetime"
    })
    createdAt: Date;

    @Column("varchar", {
        nullable: false,
        name: "created_user",
        default: "ADMIN",
        length:50
    })
    createdUser: string | null;

    @OneToMany(type =>MaterialFabricEntity, fabric=>fabric.issueInfo,{cascade:true})
    fabric:MaterialFabricEntity[]

    @OneToMany(type =>MaterialTrimEntity, trim=>trim.issueInfo,{cascade:true})
    trim:MaterialTrimEntity[]

}
