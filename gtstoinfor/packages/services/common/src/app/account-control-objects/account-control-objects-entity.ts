import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ProfitControlHead } from "../profit-control-head/profit-control-head-entity";

@Entity('account_control_objects')
export  class  AccountControlObject {
    @PrimaryGeneratedColumn("increment", { name: 'account_control_objects_id' })
    accountControlObjectsId: number;

    @Column("varchar", {
        nullable: false,
        length: 40,
        name: "account_control_objects_name"
      })
      accountControlObjectsName: string;

      
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


      @ManyToOne(type=> ProfitControlHead,pch=>pch.accountControl,{nullable:false})
      @JoinColumn({name:'profit_control_head_id'})
      pch:ProfitControlHead
}