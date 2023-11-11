import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SampleRequest } from "./sample-dev-request.entity";

@Entity('sample_request_trim_info')
export class SampleRequestTriminfoEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'trim_info_id'
    })
    trimInfoId: number

    @Column('text', {
        name: 'description',
        nullable: false
    })
    description: string

    @Column('decimal', {
        name: 'consumption',
        precision: 4,
        scale: 2,
    })
    consumption: number
    @Column('text', {
        name: 'remarks',
        nullable: true
    })
    remarks: string
    
    @Column('varchar', {
        name: 'trim_code',
        nullable: true
    })
    trimCode: string

    @Column('int',{
        name:'product_group_id',
        nullable:false
    })
    productGroupId:number

    @ManyToOne(() => SampleRequest, sampleDevReq => sampleDevReq.sampleTrimInfo)
    @JoinColumn({ name: 'sample_request_id' })
    sampleDevReqInfo: SampleRequest
}