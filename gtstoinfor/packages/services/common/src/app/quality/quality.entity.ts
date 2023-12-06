import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('quality')
export class QualityEntity {
  @PrimaryGeneratedColumn("increment", { name: 'quality_Id' })
  qualityId: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'quality',
  })
  quality: string;


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
    name: 'created_at'
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: string;

  @VersionColumn({
    default: 1,
    name: 'version_flag'
  })
  versionFlag: number;

}