import { Column, Entity, Index, PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { CommonColumns } from "../../common/common-columns.entity";

@Entity('document_role_mapping')
export class DocumentRoleMappingEntity extends CommonColumns {

    @Column("int", {
        nullable: true,
        name: "document_id",
    })
    documentId: number;

    @Column("varchar", {
        name: "role_name"
    })
    roleName: string;

    @Column("varchar", {
        name: "document_name"
    })
    documentName: string;
    static documentName: string;
}