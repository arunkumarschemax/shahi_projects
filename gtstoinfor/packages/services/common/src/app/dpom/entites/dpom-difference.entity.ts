import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('dpom_diff') //change the name
export class DpomDifferenceEntity {

    @PrimaryGeneratedColumn("increment", {
        name: "dpom_diff_id",
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        name: "po_number",
        length: 15
    })
    purchaseOrderNumber: string;

    @Column('int', {
        nullable: false,
        name: "po_line_item_number",
    })
    poLineItemNumber: number;

    @Column('varchar', {
        nullable: false,
        name: "schedule_line_item_number",
        length: 5
    })
    scheduleLineItemNumber: string;

    @Column('varchar', {
        nullable: false,
        name: "column_name",
        length: 30
    })
    columnName: string;

    @Column('varchar', {
        nullable: false,
        name: "display_name",
        length: 150
    })
    displayName: string;

    @Column('varchar', {
        nullable: true,
        name: "old_val",
        length: 150
    })
    oldValue: string;

    @Column('varchar', {
        nullable: true,
        name: "new_val",
        length: 150
    })
    newValue: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @Column('date', {
        nullable: true,
        name: 'od_date',
    })
    odDate: number;

    @Column('int', {
        name: 'od_version',
        nullable: true
    })
    odVersion: number;

    @Column('int', {
        nullable: false,
        name: 'file_id',
    })
    fileId: number;
}