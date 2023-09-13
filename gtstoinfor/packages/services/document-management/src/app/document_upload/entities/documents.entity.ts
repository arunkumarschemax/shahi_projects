import { DocumentDownloadEnum } from "@project-management-system/shared-models";
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

    @Column('int',{
        name:'priority',
        nullable:false,
        default:0
    })
    priority:number

    @Column('enum',{
        name:'is_download',
        enum:DocumentDownloadEnum
    })
    isDownload : string;
}