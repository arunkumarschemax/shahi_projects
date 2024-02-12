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
        name:'fab_colour_id',
        nullable:false,
      })
      fabColourId:number

      @Column('int',{
        name:'uom_id',
        nullable:false,
      })
      uomId:number

      @Column('decimal',{
        name:'consumption',
        nullable:false,
    })
      consumption : number;

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

      @Column('text',{
        name:'remarks',
        nullable:true
    })
      remarks : string;

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
    @ManyToOne(type =>SampleRequest,sampleReqFabric =>sampleReqFabric.sampleReqFabricInfo)
    @JoinColumn({name:'sample_request_id'})
    samplerReqFabricEntity:SampleRequest

}