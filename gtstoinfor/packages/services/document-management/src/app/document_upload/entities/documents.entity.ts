import { Column, Entity, Index, PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity('document')
export class DocumentEntity {

    @PrimaryGeneratedColumn("increment", { name: 'id' })
    id:number;

    @Column("varchar", {
        // length: 50,
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
        // length:20

    })
    createdAt: Date;

    @Column("varchar", {
        name: "created_user",
        // length:20

    })
    createdUser: string | null;


    @UpdateDateColumn({
        name: "updated_at",
        type: 'datetime',
        // length:20

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