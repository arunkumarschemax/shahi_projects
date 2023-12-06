import { type } from "os";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SampleRequest } from "./sample-dev-request.entity";
import { ItemTypeEnum } from "@project-management-system/shared-models";
import { M3ItemsEntity } from "../../m3-items/m3-items.entity";
import { trimEntity } from "../../Trim Masters/trim/trim-entity";

@Entity('sample_request_items')
export class SampleRequestItemsEntity{
    @PrimaryGeneratedColumn("increment",{
        name:'sample_request_item_id'
      })
      sampleRequestItemId:number;
     
      @Column('enum',{
        name:'item_type',
        nullable: true,
        enum:ItemTypeEnum,
      })
      itemType: ItemTypeEnum;
      
    //   @Column('int',{
    //     name:'trim_category_id',
    //     nullable:false,
    //   })
    //   trimCategoryId:number


    //   @Column('int',{
    //     name:'item_id',
    //     nullable:false,
    //   })
    //   itemId:number

      @Column('varchar', {
        name: 'item_code',
        nullable: true
    })
    itemCode: string

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

      @Column('text',{
        name:'remarks',
        nullable:true
    })
      remarks : string;

    @ManyToOne(type =>SampleRequest,sampleReqItem =>sampleReqItem.sampleReqItemsInfo)
    @JoinColumn({name:'sample_request_id'})
    sampleRequestInfo:SampleRequest

    @ManyToOne(type=>M3ItemsEntity,  m3Items=>m3Items.m3ItemsInfo,{  nullable:false, })
    @JoinColumn({ name:"item_id"})
    itemId: M3ItemsEntity;

    @ManyToOne(type=>trimEntity,  trim=>trim.trimInfo,{  nullable:false, })
    @JoinColumn({ name:"item_category_id"})
    trimCategoryId: trimEntity;

}