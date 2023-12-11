import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('pdf_file_upload')
export class PdfFileUploadEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column("varchar", {
        nullable: false,
        length: 50,
        name: "po_number",
    })
    poNumber: string 

    
    @Column("varchar", {
        nullable: false,
        length: 50,
        name: "pdf_file_name",
    })
    pdfFileName: string 

    
    @Column("varchar", {
        nullable: false,
        length: 25,
        name: "file_path",
    })
    filePath: string 

    
    @Column("varchar", {
        nullable: false,
        length: 50,
        name: "file_type",
    })
    fileType: string 



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

    // @VersionColumn({
    //     default: 1,
    //     name: "version_flag",
    // })
    // versionFlag: number;

    // @Column({
    //     nullable: false,
    //     name: "is_active",
    //     default: 1
    // })
    // isActive: boolean;

}