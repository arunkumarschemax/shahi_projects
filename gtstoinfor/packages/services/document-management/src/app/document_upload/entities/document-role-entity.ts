import { Column, Entity, Index, PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity('roleentity')
export class RoleEntity {

    @PrimaryGeneratedColumn("increment", { name: 'id' })
    id:number;

    @Column("varchar", {
        name: "role_name"
    })
    roleName: string;

    @Column("varchar", {
        name: "document_name"
    })
    documentName: string;

    @Column("boolean", {
        name: "is_active" ,

    })
    isActive: boolean;

    @CreateDateColumn({
        name: "created_at",
        type: "datetime",

    })
    createdAt: Date;

    @Column("varchar", {
        name: "created_user",

    })
    createdUser: string | null;


    @UpdateDateColumn({
        name: "updated_at",
        type: 'datetime',

    })
    updatedAt: Date;

    @Column("varchar", {
        name: "updated_user",
        

    })
    updatedUser: string | null;


    @VersionColumn({
        name: "version_flag",
      

    })
    versionFlag: number;
    static documentName: string;
}