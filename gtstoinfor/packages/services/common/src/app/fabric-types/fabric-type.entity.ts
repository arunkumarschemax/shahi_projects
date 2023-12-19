import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { FabricSubType } from "../fabric-sub-types/fabric-sub-type.entity";
import { FabricWeave } from "../fabric weave/fabric-weave.entity";

@Entity('fabric_type')
export class FabricType {
    @PrimaryGeneratedColumn("increment", { name: 'fabric_type_id' })
    fabricTypeId: number;

    @Column("varchar", {
        nullable: false,
        length: 40,
        name: "fabric_type_name"
      })
      fabricTypeName: string;

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

      @OneToMany(()=>FabricSubType, fabricSubtype=>fabricSubtype.fabricType,{cascade:true})
      fabrictypeName:FabricSubType[];
}