import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SampleRequest } from "./sample-dev-request.entity";

@Entity('sample_request_trim_info')
export class SampleRequestTriminfoEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'trim_info_id'
    })
    trimInfoId: number

    @Column('int', {
        name: 'uom_id',
        nullable: true
    })
    uomId: number

    @Column('decimal', {
        name: 'consumption',
        nullable:false,
    })
    consumption: number
    @Column('text', {
        name: 'remarks',
        nullable: true
    })
    remarks: string
    
    @Column('int', {
        name: 'trim_code',
        nullable: false
    })
    trimCode: number

    @Column('varchar', {
        name: 'trim_type',
        nullable: true
    })
    trimType: string
    @Column('decimal',{
        name:'total_requirement',
      nullable:false,
    })
    totalRequirement : number;
    @Column('decimal',{
        name:'wastage',
      nullable:false,
    })
    wastage : number;

    @Column("varchar", {
        name: "file_name",
        nullable:true
    })
    fileName: string;
    @Column("varchar", {
        name: "file_path",
        nullable:true
    })
    filePath: string;
    @ManyToOne(() => SampleRequest, sampleDevReq => sampleDevReq.sampleTrimInfo)
    @JoinColumn({ name: 'sample_request_id' })
    sampleDevReqInfo: SampleRequest
}