import { BaseEntity, Column, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn, Entity } from "typeorm";
import { ComponentMappingEntity } from "../components-mapping/component-mapping.entity";

@Entity('garment_categories')
export class GarmentCategory {

    @PrimaryGeneratedColumn("increment", { name: 'garment_category_id' })
    garmentCategoryId: number;

    @Column("varchar", {
        nullable: false,
        length: 40,
        name: "garment_category"
      })
      garmentCategory: string;

      @Column("varchar", {
        nullable: true,
        length: 50,
        name: "remarks"
      })
      remarks: string;

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

      @OneToMany(type => ComponentMappingEntity,commap => commap.garmentcategoryInfo,{cascade:true})
      componentMappingInfo : ComponentMappingEntity;
}
