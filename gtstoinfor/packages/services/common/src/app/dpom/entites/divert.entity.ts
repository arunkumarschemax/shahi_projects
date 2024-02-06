import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('divert_report')
export class DivertEntity {
    @PrimaryGeneratedColumn("increment", {
        name: "id",
    })
    id: number;

    @Column('varchar', {
        nullable: true,
        name: "o_item",
        length: 10
    })
    oItem: string;

    @Column('varchar', {
        nullable: true,
        name: "o_plant",
        length: 10
    })
    oPlant: string;

    @Column('varchar', {
        nullable: true,
        name: "o_product_code",
        length: 15
    })
    oProductCode: string;

    @Column('varchar', {
        nullable: false,
        name: "o_factory",
        length: 5
    })
    oFactory: string;

    @Column('varchar', {
        nullable: false,
        name: "o_line_item_status",
        length: 15
    })
    oLineItemStatus: string;

    @Column('varchar', {
        nullable: false,
        name: "o_document_date",
        length: 15
    })
    oDocumentDate: string;

    @Column('varchar', {
        nullable: false,
        name: "o_po_number",
        length: 15
    })
    oPurchaseOrderNumber: string;

    @Column('int', {
        nullable: false,
        name: "o_po_line",
    })
    oPoLineItemNumber: number;

    @Column('varchar', {
        nullable: false,
        name: "o_total_item_qty",
        length: 10
    })
    oTotalItemQty: string;

    @Column('varchar', {
        nullable: false,
        name: "o_shipment_type",
        length: 50
    })
    oShipmentType: string;

    @Column('varchar', {
        nullable: false,
        name: "o_ogac",
        length: 15
    })
    oOGAC: string;

    @Column('varchar', {
        nullable: false,
        name: "o_gac",
        length: 15
    })
    oGAC: string;

    @Column('varchar', {
        nullable: false,
        name: "o_inv_segment_code",
        length: 50
    })
    oInventorySegmentCode: string;

    @Column('text', {
        nullable: true,
        name: "o_item_vas_text",
    })
    oItemVasText: string;

    @Column('text', {
        nullable: true,
        name: "o_item_text",
    })
    oItemText: string;

    @Column('varchar', {
        nullable: true,
        name: "old_bal_qty",
        length: 10
    })
    oldVal: string;

    @Column('varchar', {
        nullable: true,
        name: "o_fob_price",
        length: 10
    })
    oFOBPrice: string;

    @Column('varchar', {
        nullable: true,
        name: "o_trade_co_net_inc_disc",
        length: 10
    })
    otradingCoNetIncDis: string;
}
