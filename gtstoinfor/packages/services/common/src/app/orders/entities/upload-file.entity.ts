import { FileTypesEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('file_upload') //change the name
export class FileUploadEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'id',
    })
    id: number

    @Column('varchar', {
        nullable: true,
        name: "file_name",
        length: 250
    })
    fileName: string;

    @Column('varchar', {
        nullable: true,
        name: "file_path",
    })
    filePath: string;
    @Column('enum', {
        name: 'file_type',
        enum: FileTypesEnum
    })
    fileType: string;

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

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;

    @Column("boolean", {
        default: true,
        nullable: true,
        name: "is_active"
    })
    isActive: boolean;

    @Column("varchar", {
        nullable: true,
        name: "status"
    })
    status: string;

    @Column("int", {
        nullable: true,
        name: "month"
    })
    month: number;

    @Column('varchar', {
        name: 'upload_type',
        nullable: false,
        length:20
    })
    uploadType: string;
    @Column("text", {
        nullable: true,
        name: "columns"
      })
    columns: string;
    @Column('varchar', {
        name: 'failed_reason',
        nullable: false,
        length:100
    })
    failedReason: string;
}