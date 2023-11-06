import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { MaterialIssueEntity } from "./material-issue-entity";

@Entity('material_fabric')
export class MaterialFabricEntity {
  
  @PrimaryGeneratedColumn("increment",{
    name:'material_fabric_id'
  })
  materialFabricId:number;

  @Column("varchar",{
    nullable: true,
    length:30,
    name:"fabric_code"
    })
  fabricCode:string;

  @Column('varchar',{
    nullable:false,
    name:'description',
    length: 255
    })
    description:string;

  @Column('int',{
    nullable:false,
    name:'color_id'
    })
    colorId:number;

  @Column('int',{
    nullable:false,
    name:'consumption'
    })
    consumption:number;

  @Column('varchar',{
    nullable:false,
    name:'consumption_uom'
    })
    consumptionUom:string;

    @Column('int',{
      nullable:false,
      name:'uom_id'
      })
      uomId:number;

  @Column('int',{
    nullable:false,
    name:'issued_quantity'
    })
    issuedQuantity:number;

  @Column('varchar',{
    nullable:false,
    name:'issued_quantity_uom'
    })
    issuedQuantityUom:string;

    @Column('int',{
      nullable:false,
      name:'issued_uom_id'
      })
      issuedUomId:number;

  @CreateDateColumn({
    name: "created_at",
    type:"datetime"
  })
  createdAt: Date;

  @Column("varchar", {
      nullable: true,
      name: "created_user"
  })
  createdUser: string | null;

  @Column("varchar", {
      nullable: true,
      name: "status"
  })
  status: string | null;

  @Column('varchar',{
    nullable:false,
    name:'remarks',
    length: 255
    })
    remarks:string;

    @ManyToOne(() => MaterialIssueEntity, (issue) => issue.fabric)
    @JoinColumn({ name: 'material_issue_id' })
    issueInfo: MaterialIssueEntity;
  }
