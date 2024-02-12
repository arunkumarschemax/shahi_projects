import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SampleRequest } from "./sample-dev-request.entity";

@Entity('sample_request_process_info')
export class SampleRequestProcessInfoEntity{
    @PrimaryGeneratedColumn('increment',{
        name:'process_info_id'
    })
    processInfoId:number
    @Column('int',{
        name:'operation',
        nullable:false
    })
    operation:number
    @Column('int',{
        name:'sequence',
        nullable:false
    })
    sequence:number
    @ManyToOne(type =>SampleRequest,sampleReq =>sampleReq.sampleProcessInfo)
    @JoinColumn({name:'sample_request_id'})
    sampleReq:SampleRequest
}