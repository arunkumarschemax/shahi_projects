import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { SampleRequest } from "./sample-dev-request.entity";

@Entity('sample_requset_size_info')
export class SampleReqSizeEntity{
    @PrimaryGeneratedColumn("increment",{
        name:'sample_req_size_id'
      })
      SampleRequestSizeId:number;

      @Column('int',{
        name:'colour_id',
        nullable:false
      })
      colourId:number

      @Column('int',{
        name:'size_id',
        nullable:false
      })
      sizeId:number

      @Column('decimal',{
        name:'quantity',
        precision: 10, 
        scale: 3,
    })
      quantity : number;
      
      @CreateDateColumn({
        name: 'created_at'
    })
     createdAt: string;
 
    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'updated_user'
    })
    updatedUser: string | null;

    @VersionColumn({
        default: 1,
        name: 'version_flag'
    })
    versionFlag: number;

    @ManyToOne(() => SampleRequest, (samplereq) => samplereq.samplereqsizeinfo)
    @JoinColumn({ name: 'sample_request_id' })
    samplerReqEntity: SampleRequest;

}
