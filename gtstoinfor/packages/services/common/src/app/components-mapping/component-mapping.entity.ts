import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Style } from "../style/dto/style-entity";
import { GarmentCategory } from "../garment-category/garment-category.entity";
import { Garments } from "../garments/garments.entity";
import { Components } from "../components/components.entity";

@Entity('component_mapping')
export class ComponentMappingEntity{
    @PrimaryGeneratedColumn('increment',{
        name:'component_mapping_id'
    })
    componentMappingId: number;

    @Column("boolean", {
        nullable: false,
        default: true,
        name: "is_active"
      })
      isActive: boolean;

      @CreateDateColumn({
        name: "created_at",
        type: "datetime"
      })
      createdAt: Date;

      @Column("varchar", {
        nullable: true,
        name: "created_user"
      })
      createdUser: string | null;

      @UpdateDateColumn({
        name: "updated_at",
        type: 'datetime'
      })
      updatedAt: Date;

      @Column("varchar", {
        nullable: true,
        name: "updated_user"
      })
      updatedUser: string | null;

      @VersionColumn({
        default: 1,
        name: "version_flag"
      })
      versionFlag: number;

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

    @ManyToOne(type=>Style, style=>style.componentMappingInfo,{  nullable:false, })
    @JoinColumn({ name:"style_id"})
    styleInfo: Style;


     @ManyToOne(type=>Garments, garment=>garment.componentMappingInfo,{  nullable:false, })
    @JoinColumn({ name:"garment_id"})
    garmentInfo: Garments;

    @ManyToOne(type=>GarmentCategory, garmentsCategory=>garmentsCategory.componentMappingInfo,{  nullable:false, })
    @JoinColumn({ name:"garment_category_id"})
    garmentcategoryInfo: GarmentCategory;

     @ManyToOne(type=>Components, component=>component.componentMappingInfo,{  nullable:false, })
    @JoinColumn({ name:"component_id"})
    componentInfo: Components;
    

}