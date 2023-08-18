import { Column, Entity, Index, PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity('upload_files')
export class UploadFilesEntity {

    @PrimaryGeneratedColumn("increment", { name: 'id' })
    id:number;

    @Column("int", {
        nullable: true,
        name: "document_list_id",
    })
    documentListId: number;
    
    @Column("varchar", {
        name: "uid"
    })
    uid: any;
    @Column("varchar", {
        name: "file_name"
    })
    fileName: string;
    @Column("varchar", {
        name: "file_path"
    })
    filePath: string;
    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'created_user'
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'updated_user'
    })
    updatedUser: string | null;

    @VersionColumn({
        default: 1,
        name: 'version_flag'
    })
    versionFlag: number;

    @Column('boolean', {
        nullable: false,
        name: 'is_active',
        default: true
    })
    isActive: boolean;
}