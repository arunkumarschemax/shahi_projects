import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('rack_position')
export class RackPositionEntity {
  @PrimaryGeneratedColumn("increment", { name: 'position_Id' })
  positionId: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'rack_position_name',
  })
  rackPositionName: string;

  @Column('varchar', {
    nullable: false,
    length: 20,
    name: 'position_code',
  })
  positionCode: number;

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