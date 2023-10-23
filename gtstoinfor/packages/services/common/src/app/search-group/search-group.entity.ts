import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ProfitControlHead } from "../profit-control-head/profit-control-head-entity";

@Entity('search_group')
export  class  SearchGroupEnitty {

    @PrimaryGeneratedColumn("increment", { name: 'id' })
    id: number;

    @Column("varchar", {
        nullable: false,
        length: 25,
        name: "search_grp_code"
      })
      searchGrpCode: string;

      
    @Column("varchar", {
        nullable: false,
        length: 25,
        name: "search_grp_name"
      })
      searchGrpName: string;

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

      @Column("boolean",{
        nullable:false,
        default:true,
        name:"is_active"
        })
      isActive:boolean;

}