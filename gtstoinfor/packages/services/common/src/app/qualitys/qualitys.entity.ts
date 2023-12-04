import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('qualitys')
export class QualitysEntity {
  @PrimaryGeneratedColumn("increment", { name: 'quality_Id' })
  qualityId: number;

  @Column('varchar', {
    nullable: true,
    length: 200,
    name: 'quality_name',
  })
  qualityName: string;


  @Column("boolean", {
    nullable: false,
    default: true,
    name: "is_active"
  })
  isActive: boolean;

  @Column("varchar", {
    nullable: true,
    name: "created_user"
  })
  createdUser: string | null;

  @Column("varchar", {
    nullable: true,
    name: "updated_user"
  })
  updatedUser: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type:"datetime"

  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type:'datetime'

  })
  updatedAt: Date;

  @VersionColumn({
    default: 1,
    name: 'version_flag'
  })
  versionFlag: number;

}