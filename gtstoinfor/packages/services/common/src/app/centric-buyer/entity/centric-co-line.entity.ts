import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('centric_co_line') //change the name
export class CentricCOLineEntity {

    @PrimaryGeneratedColumn("increment", {
        name: "id",
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        name: "buyer",
        length: 50
    })
    buyer: string;

    @Column('varchar', {
        nullable: false,
        name: "po_number",
        length: 15
    })
    poNumber: string;

    @Column('int', {
        nullable: true,
        name: "po_line",
    })
    poLine: number;

    
    @Column('varchar', {
        nullable: true,
        name: "item_no",
        length: 4
    })
    itemNo: string;

   

    @Column('varchar', {
        nullable: true,
        name: "co_date",
        length: 10
    })
    coDate: string;

    @Column('varchar', {
        nullable: true,
        name: "status",
        length: 15
    })
    status: string;

    @Column('varchar', {
        nullable: true,
        name: "error_msg",
        length: 50
    })
    errorMsg: string;

    @CreateDateColumn({
        name: 'created_at'
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

    @VersionColumn({
        default: 1,
        name: "version_flag",
    })
    versionFlag: number;

    @Column({
        nullable: false,
        name: "is_active",
        default: 1
    })
    isActive: boolean;
}