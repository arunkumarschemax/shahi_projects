import { type } from "os";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SampleRequest } from "./sample-dev-request.entity";

@Entity('sample_request_fabric_info')
export class SampleReqFabricinfoEntity{
    @PrimaryGeneratedColumn("increment",{
        name:'fabric_info_id'
      })
      fabricInfoId:number;
      @Column('varchar',{
        name:'fabric_code',
        nullable:false,
        length:100
      })
      fabricCode:string

      @Column('text',{
        name:'description',
        nullable:false,
      })
      description:string

      @Column('int',{
        name:'colour_id',
        nullable:false,
      })
      colourId:number

      @Column('int',{
        name:'product_group_id',
        nullable:false,
      })
      productGroupId:number

      @Column('decimal',{
        name:'consumption',
        precision: 4, 
        scale: 2,
    })
      consumption : number;

      @Column('text',{
        name:'remarks',
    })
      remarks : string;

    @ManyToOne(type =>SampleRequest,sampleReqFabric =>sampleReqFabric.sampleReqFabricInfo)
    @JoinColumn({name:'sample_request_id'})
    samplerReqFabricEntity:SampleRequest

}