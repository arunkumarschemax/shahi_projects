import { type } from "os";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SampleRequest } from "./sample-dev-request.entity";

@Entity('sample_request_fabric_info')
export class SampleReqFabricinfoEntity{
    @PrimaryGeneratedColumn("increment",{
        name:'fabric_info_id'
      })
      fabricInfoId:number;
      @Column('int',{
        name:'fabric_code',
        nullable:false,
      })
      fabricCode:number


      @Column('int',{
        name:'colour_id',
        nullable:false,
      })
      colourId:number

      @Column('int',{
        name:'uom_id',
        nullable:false,
      })
      uomId:number

      @Column('decimal',{
        name:'consumption',
    })
      consumption : number;

      @Column('decimal',{
        name:'total_requirement',
    })
    totalRequirement : number;

    @Column('decimal',{
      name:'wastage',
  })
  wastage : number;

      @Column('text',{
        name:'remarks',
        nullable:true
    })
      remarks : string;

    @ManyToOne(type =>SampleRequest,sampleReqFabric =>sampleReqFabric.sampleReqFabricInfo)
    @JoinColumn({name:'sample_request_id'})
    samplerReqFabricEntity:SampleRequest

}