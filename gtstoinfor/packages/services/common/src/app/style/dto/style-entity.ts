import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ComponentMappingEntity } from "../../components-mapping/component-mapping.entity";

@Entity('style')
export class Style {

  @PrimaryGeneratedColumn("increment",{name:'style_id'})
  styleId:number;

  @Column("int",{
    nullable:false,
    name:"location_id"
    })
    locationId:number;

  @Column("varchar",{
    nullable:false,
    length:100,
    name:"pch"
    })
  pch:string;

  @Column("varchar",{
    nullable:false,
    length:100,
    name:"style"
    })
  style:string;

  @Column("varchar",{
    nullable:false,
    length:100,
    name:"description"
    })
  description:string;

    @Column('varchar', {
      name: 'style_file_name',
      nullable: false
  })
  styleFileName: string;

  @Column('varchar', {
      name: 'style_file_path',
      nullable: false
  })
  styleFilePath: string;
  
  @Column("boolean",{
    nullable:false,
    default:true,
    name:"is_active"
    })
  isActive:boolean;

  @CreateDateColumn({
    name: "created_at",
    type:"datetime"
  })
  createdAt: Date;

  @Column("varchar", {
      nullable: false,
      name: "created_user",
      default:"ADMIN",
      length:50
  })
  createdUser: string | null;


  @UpdateDateColumn({
      name: "updated_at",
      type:'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
      nullable: true,
      name: "updated_user",
      length:50
  })
  updatedUser: string | null;

  @VersionColumn({
      default:1,
      name: "version_flag"
  })
  versionFlag: number;

  @OneToMany(type => ComponentMappingEntity,commap => commap.styleInfo,{cascade:true})
  componentMappingInfo : ComponentMappingEntity;

}
