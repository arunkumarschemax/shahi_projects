import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { SampleRequest } from "./sample-dev-request.entity";

@Entity('sample_requset_process_info')
export class SampleRequestProcessInfoEntity{
    @PrimaryGeneratedColumn('increment',{
        name:'process_info_id'
    })
    processInfoId:number
    @Column('text',{
        name:'process',
        nullable:false
    })
    process:string
    @Column('text',{
        name:'description',
        nullable:true
    })
    description:false
    @ManyToMany(type =>SampleRequest,samplereq =>samplereq.sampleProcessInfo)
    @JoinColumn({name:'sample_request_id'})
    sampleReq:SampleRequest
}