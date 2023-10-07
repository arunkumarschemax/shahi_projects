import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { SampleRequest } from "../sample-dev-request.entity";

@Entity('sample_requset_trim_info')
export class SampleRequestTriminfoEntity{
    @PrimaryGeneratedColumn('increment',{
        name:'trim_info_id'
    })
    trimInfoId:number

    @Column('text',{
        name:'description',
        nullable:false
    })
    description:string

    @Column('decimal',{
        name:'consumption',
        precision: 4, 
        scale: 2,
    })
    consumption:number
    @Column('text',{
        name:'remarks',
        nullable:true
    })
    remarks:string

    @ManyToMany(type =>SampleRequest,sampledevReq =>sampledevReq.sampleTrimInfo)
    @JoinColumn({name:'sample_request_id'})
    sapleDevReqInfo:SampleRequest
}