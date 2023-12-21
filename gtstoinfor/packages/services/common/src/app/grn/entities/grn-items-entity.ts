import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { GrnEntity } from "./grn-entity";
import { GRNTypeEnum, LocationMappedEnum, PurchaseOrderStatus } from "@project-management-system/shared-models";
import { PurchaseOrderFbricEntity } from "../../purchase-order/entities/purchase-order-fabric-entity";
import { PurchaseOrderTrimEntity } from "../../purchase-order/entities/purchase-order-trim-entity";

@Entity('grn_items')
export class GrnItemsEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'grn_item_id'
    })
    grnItemId: number;

    @Column('int', {
        name: 'po_item_id'
    })
    poItemId: number

    @Column('int', {
        name: 'style_id'
    })
    styleId: number


    @Column('varchar', {
        name: 'received_quantity',
        nullable: false
    })
    receivedQuantity: number

    @Column('varchar', {
        name: 'accepted_quantity',
        nullable: false
    })
    acceptedQuantity: number


    @Column('varchar', {
        name: 'rejected_quantity',
        nullable: false
    })
    rejectedQuantity: number


    @Column('decimal', {
        name: 'conversion_quantity',
        nullable: false
    })
    conversionQuantity: number

    @Column('int', {
        name: 'conversion_uom_id',
        nullable: false
    })
    conversionUomId: number


    @Column('enum', {
        name: 'location_mapped_status',
        enum: LocationMappedEnum
    })
    status: LocationMappedEnum


    @Column('text', {
        name: 'remarks',
        nullable: true
    })
    remarks: string

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

    @VersionColumn({
        default: 1,
        name: "version_flag",
    })
    versionFlag: number;


    @Column('int', {
        name: 'm3_item_code_id',
        nullable: false
    })
    m3ItemCodeId: number

    @Column('int', {
        name: 'indent_item_id',
        nullable: false,
    })
    indentItemId: number

    @Column('int', {
        name: 'sample_item_id',
        nullable: false,
    })
    sampleItemId: number

    @Column('int', {
        name: 'sample_req_id',
        nullable: false,
    })
    sampleRequestId: number

    @Column('int', {
        name: 'indent_id',
        nullable: false,
    })
    indentId: number

    @Column('int', {
        name: 'grn_item_amount',
        nullable: false,
    })
    grnItemAmount: number

    @Column('int', {
        name: 'buyer_id',
        nullable: false,
    })
    buyerId: number

    @Column('int', {
        name: 'uom_id',
        nullable: false
    })
    uomId: number

    @Column('varchar', {
        name: 'grn_item_no',
        nullable: false
    })
    grnItemNo: number

    @Column('int', {
        name: 'po_id',
        nullable: false
      })
      poId: number

    @ManyToOne(type => GrnEntity, grn => grn.grnItemInfo)
    @JoinColumn({ name: 'grn_id' })
    grnEntity: GrnEntity



}