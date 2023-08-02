import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { AttributeAgainstEnum } from "packages/libs/shared-models/src/enum";
import { BuyerGeneralAttributesEntity } from "../buyers/buyers-general.entity";


@Entity('attributes')
export class Attributes {

  @PrimaryGeneratedColumn("increment", { name: 'attribute_id' })
  attributeId: number;

  @Column("varchar", {
    nullable: false,
    length: 40,
    name: "attribute_name"
  })
  attributeName: string;

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

  @Column("enum", {
    name: "attribute_against",
    enum: AttributeAgainstEnum
  })
  attributeAgainst: AttributeAgainstEnum;

  @OneToMany(type => BuyerGeneralAttributesEntity, attribute => attribute.buyerInfo,{cascade: true})
  generalAttributesInfo : BuyerGeneralAttributesEntity

}
