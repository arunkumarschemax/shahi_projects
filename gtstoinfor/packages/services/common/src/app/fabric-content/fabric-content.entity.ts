import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('fabric_content')
export class FabricContent   {

      @PrimaryGeneratedColumn("increment", { name: 'id' })
    id: number;


  @Column('varchar',{
    name: "style",
    length: 25,
  })
  style: string;

  @Column('varchar',{
    name: "Component",
    length: 25,
  })
  Component: string;

  @Column('varchar',{
    name: "fabric_content",
    length: 50,
  })
  fabricContent: string;

 
@Column('varchar', {
    nullable: true,
    length: 40,
    name: 'created_user'
})
createdUser: string | null;

@Column('varchar', {
    nullable: true,
    length: 40,
    name: 'updated_user'
})
updatedUser: string | null;

@Column({
    name: 'created_at'
})
createdAt: string;

@Column({
    name: 'updated_at'
})
updatedAt: string;

@Column('int', {
    nullable: true,
    name: 'version',
})
version: number;
@Column({
    nullable: false,
    name: "is_active",
    default: 1
})
isActive: boolean;
}
