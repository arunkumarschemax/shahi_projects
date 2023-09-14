
import { PoStatusEnum } from "packages/libs/shared-models/src/common/whatsapp/doc-list-enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('orders') //change the name
export class OrdersEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'id',
    })
    id: number

    @Column('varchar', {
        nullable: true,
        name: "buyer",
        length: '5'
    })
    buyer: string;

    @Column('int', {
        nullable: true,
        name: "challan_no",
        //length: '5'
    })
    challanNo: number;

    @Column('varchar', {
        nullable: true,
        name: "invoice_no",
        length: '100'
    })
    invoiceNo: string;

    @Column('varchar', {
        nullable: true,
        name: "style",
        length: '100'
    })
    style: string;

    @Column('varchar', {
        nullable: true,
        name: "po_no",
        length: '100'
    })
    poNo: string;

    @Column('varchar', {
        nullable: true,
        name: "date",
        //length: '6'

    })
    date: any;

    @Column('varchar', {
        nullable: true,
        name: "dest"
    })
    dest: string;

    @Column('varchar', {
        nullable: true,
        name: "tc_status",
        //length: '11'
    })
    tcStatus: string;

    @Column('int', {
        nullable: true,
        name: "ship_qty"
    })
    shipQty: number;

    @Column('int', {
        nullable: true,
        name: "ctns",
    })
    ctns: number;

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

    @Column('int', {
        nullable: true,
        name: 'version',
    })
    version: number;

    // @OneToMany(() => OrdersChildEntity, (ordersChild) => { ordersChild.orders }, { cascade: true })
    // ordersChild: OrdersChildEntity;

    @Column('int', {
        nullable:true,
        name: 'file_id',
    })
    fileId : number;

    
    @Column('enum', {
        name: 'order_po_status',
        nullable: false,
        default:PoStatusEnum.Open,
        enum: PoStatusEnum
    })
    orderPoStatus: string;
}
