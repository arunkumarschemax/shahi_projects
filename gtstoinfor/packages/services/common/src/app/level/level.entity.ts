import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { RackPositionEntity } from "../rm_locations/rack-position.entity";


@Entity('levels')
export class Levels{
    @PrimaryGeneratedColumn("increment",{name:'level_id'})
    levelId:number;


    @Column("varchar",{
        nullable:false,
        length:200,
        name:"level_name"
    })
    levelName:string;


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
    

      @OneToMany(type=>RackPositionEntity, rack=>rack.level,{cascade: true})
      Level:RackPositionEntity;
}