import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import {DoclListEnum} from '../../../../../../libs/shared-models/src/common/whatsapp/doc-list-enum'
@Entity('documents_list')
export class DocumentsList {
    @PrimaryGeneratedColumn("increment", { name: 'documents_list_id' })
    documentsListId: number;
   
    @Column("int", {
        nullable: true,
        name: "document_category_id",
    })
    documentCategoryId: number;

    @Column("int", {
        nullable: true,
        name: "role_id",
    })
    roleId: number;

    @Column("varchar", {
        name: "role_name"
    })
    roleName: string;

    @Column("varchar", {
        nullable: true,
        name: "customer_po",
    })
    customerPo: string;
 

    @Column('enum', {
        name: 'status',
        nullable: false,
        enum: DoclListEnum
    })
    status: DoclListEnum;
    

    @Column("int", {
        nullable: true,
        name: "order_id",
    })
    orderId: number;

    @Column("varchar", {
        nullable: true,
        name: "file_name",
    })
    fileName: string;

    @Column("varchar", {
        nullable: true,
        name: "file_path",
    })
    filePath: string;

    @Column("boolean", {
        nullable: true,
        name: "is_uploaded",
        default: false
    })
    isUploaded: boolean;

    @Column("boolean", {
        nullable: false,
        default: true,
        name: "is_active"
    })
    isActive: boolean;

    @CreateDateColumn({
        name: "created_at",
        type: "datetime"
    })
    createdAt: Date;

    @Column("varchar", {
        nullable: false,
        name: "created_user",
        length: 50,
        default:"Admin"
    })
    createdUser: string | null;


    @UpdateDateColumn({
        name: "updated_at",
        type: 'datetime'
    })
    updatedAt: Date;

    @Column("varchar", {
        nullable: true,
        name: "updated_user",
        length: 50
    })
    updatedUser: string | null;


    @VersionColumn({
        default: 1,
        name: "version_flag"
    })
    versionFlag: number;


}