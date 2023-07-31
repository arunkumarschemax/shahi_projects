import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('component_mapping')
export class ComponentMappingEntity{
    @PrimaryGeneratedColumn('increment',{
        name:'component_mapping_id'
    })
    componentMappingId: number;

    // @Column('int',{
    //     name:'style_id'
    // })
    // styleId: number;

    // @Column('int',{
    //     name:'garment_category_id'
    // })
    // garmentCategoryId: number;

    // @Column('int',{
    //     name:'garment_id'
    // })
    // garmentId: number;

    // @Column('int',{
    //     name:'component_id'
    // })
    // componentId: number;

    // @ManyToOne(type=>Styles, style=>style.componentMappingInfo,{  nullable:false, })
    // @JoinColumn({ name:"style_id"})
    // styleInfo: Styles;

     // @ManyToOne(type=>GarmentCategory, garmentCategory=>garmentCategory.componentMappingInfo,{  nullable:false, })
    // @JoinColumn({ name:"garment_category_id"})
    // garmentCategoryInfo: GarmentCategory;

     // @ManyToOne(type=>Garment, garment=>garment.componentMappingInfo,{  nullable:false, })
    // @JoinColumn({ name:"garment_id"})
    // garmentInfo: Garment;

     // @ManyToOne(type=>Components, component=>component.componentMappingInfo,{  nullable:false, })
    // @JoinColumn({ name:"component_id"})
    // componentInfo: Components;

}