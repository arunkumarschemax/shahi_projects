import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { FabricType } from "../fabric-types/fabric-type.entity";


@Entity('fabric_sub_type')
export  class  FabricSubType {
    @PrimaryGeneratedColumn("increment", { name: 'fabric_sub_type_id' })
    fabricSubTypeId: number;

    @Column("varchar", {
        nullable: false,
        length: 40,
        name: "fabric_sub_type_name"
      })
      fabricSubTypeName: string;

      
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

      @ManyToOne(()=> FabricType,fabricType=>fabricType.fabrictypeName)
      @JoinColumn({name:'fabric_type_id'})
      fabricType:FabricType
}