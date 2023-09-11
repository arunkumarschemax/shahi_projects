import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn, OneToMany } from "typeorm";
import { DpomChildEntity } from "./dpom-child.entity";
import { FileTypeEnum } from "@project-management-system/shared-models";

@Entity('pdf_file_info')
export class PDFFileInfoEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;
    @Column('varchar', {
        name: "pdf_file_name",
        length: 50,
        nullable:false
    })
    pdfFileName: string;
    @Column({
        type: 'enum',
        nullable: false,
        enum: FileTypeEnum,
        name: "file_type"
      })
      fileType: FileTypeEnum;
    @Column("text", {
        nullable: false,
        name: "file_data"
        })
    fileData: string;
    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: string;

    @Column("varchar", {
        nullable: true,
        length: 40,
        name: "created_user",
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: string;

    @Column("varchar", {
        nullable: true,
        length: 40,
        name: "updated_user",
    })
    updatedUser: string | null;


}
