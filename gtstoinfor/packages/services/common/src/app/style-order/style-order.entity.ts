import { CustomerOrderStatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Item } from "../items/item-entity";
import { Warehouse } from "../warehouse/warehouse.entity";
import { FactoriesEntity } from "../factories/factories.entity";
import { Style } from "../style/dto/style-entity";
import { PackageTerms } from "../packages-terms/package-terms.entity";
import { DeliveryMethod } from "../delivery-method/delivery-method.entity";
import { DeliveryTerms } from "../delivery-terms/delivery-terms.entity";
import { Currencies } from "../currencies/currencies.entity";
import { PaymentMethod } from "../payment-methods/payment-method-entity";
import { PaymentTerms } from "../payment-terms/payment-terms.entity";
import { OrderLine } from "./order-line.entity";
import { Buyers } from "../buyers/buyers.entity";
import { ItemCreation } from "../fg-item/item_creation.entity";
import { CoTypes } from "../co-type/co-type.entity";
import { UomEntity } from "../uom/uom-entity";
import { CoBom } from "../co-bom/co-bom.entity";
import { CoLine } from "./co-line.entity";

@Entity('customer_order')
export class StyleOrder{

    @PrimaryGeneratedColumn("increment",{
        name:'co_id'
    })
    coId:number;

    @Column('varchar',{
        name:'order_number',
        nullable:false,
        length:25
    })
    orderNumber : string;

    @Column('varchar',{
        name:'item_code',
        nullable:false,
        length:60
    })
    itemCode : string;

    @Column('datetime',{
        name:'order_date',
        nullable: false
    })
    orderDate: Date;

    @Column('varchar',{
        name:'buyer_po_number',
        nullable:false,
        length:30
    })
    buyerPoNumber : string;

    @Column('varchar',{
        name:'shipment_type',
        nullable:true,
        length:30
    })
    shipmentType : string;

    @Column('varchar',{
        name:'buyer_style',
        nullable:false,
        length:50
    })
    buyerStyle : string;

    @Column('varchar',{
        name:'agent',
        nullable:true,
        length:50
    })
    agent : string;

    @Column('varchar',{
        name:'buyer_address',
        nullable:false,
        length:80
    })
    buyerAddress : string;

    @Column('datetime',{
        name:'instore_date',
        nullable: false
    })
    instoreDate: Date;

    @Column('decimal',{
        name:'sale_price',
        nullable: false
    })
    salePrice: number;

    @Column('int',{
        name:'price_quantity',
        nullable: false
    })
    priceQuantity: number;

    @Column('decimal',{
        name:'discount_per',
        nullable: true
    })
    discountPercent: number;

    @Column('decimal',{
        name:'discount_amount',
        nullable: true
    })
    discountAmount: number;

    @Column('enum',{
        name:'status',
        nullable: false,
        enum:CustomerOrderStatusEnum
    })
    status: CustomerOrderStatusEnum;

   @Column('text',{
        name:'remarks',
        nullable:true
    })
    remarks: string;

    @Column('int',{
        name:'merchandiser',
        nullable:true,
    })
    merchandiser : number;

    @Column('int',{
        name:'planner',
        nullable:true,
    })
    planner : number;

    @Column('int',{
        name:'item_sale_price_qty',
        nullable:true,
    })
    itemSalePriceQty : number;

    @Column("boolean",{
    nullable:false,
    default:true,
    name:"is_active"
    })
    isActive:boolean;

    @CreateDateColumn({
    name: "created_at",
    type:"datetime"
    })
    createdAt: Date;

    @Column("varchar", {
        nullable: false,
        name: "created_user",
        default:"ADMIN",
        length:50
    })
    createdUser: string | null;


    @UpdateDateColumn({
        name: "updated_at",
        type:'datetime'
    })
    updatedAt: Date;

    @Column("varchar", {
        nullable: true,
        name: "updated_user",
        length:50
    })
    updatedUser: string | null;

    @VersionColumn({
        default:1,
        name: "version_flag"
    })
    versionFlag: number;

    @ManyToOne(type=>ItemCreation, item=>item.styleOrderInfo,{  nullable:false, })
    @JoinColumn({ name:"fg_item_id"})
    fgitemInfo: ItemCreation;

    @ManyToOne(type=>Warehouse, wh=>wh.styleOrderInfo,{  nullable:false, })
    @JoinColumn({ name:"warehouse_id"})
    warehouseInfo: Warehouse;

    @ManyToOne(type=>FactoriesEntity, fac=>fac.styleOrderInfo,{  nullable:false, })
    @JoinColumn({ name:"facility_id"})
    factoryInfo: FactoriesEntity;

    @ManyToOne(type=>Style, style=>style.styleOrderInfo,{  nullable:true, })
    @JoinColumn({ name:"style_id"})
    styleInfo: Style;

    @ManyToOne(type=>PackageTerms, pacterms=>pacterms.styleOrderInfo,{  nullable:false, })
    @JoinColumn({ name:"package_terms_id"})
    packageTermsInfo: PackageTerms;

    @ManyToOne(type=>DeliveryMethod, delimeth=>delimeth.styleOrderInfo,{  nullable:false, })
    @JoinColumn({ name:"delivery_method_id"})
    deliveryMethodInfo: DeliveryMethod;

    @ManyToOne(type=>DeliveryTerms, deliterms=>deliterms.styleOrderInfo,{  nullable:false, })
    @JoinColumn({ name:"delivery_terms_id"})
    deliveryTermsInfo: DeliveryTerms;

    @ManyToOne(type=>Currencies, cure=>cure.styleOrderInfo,{  nullable:false, })
    @JoinColumn({ name:"currency_id"})
    currenciesInfo: Currencies;

    @ManyToOne(type=>PaymentMethod, paymeth=>paymeth.styleOrderInfo,{  nullable:false, })
    @JoinColumn({ name:"Payment_method_id"})
    paymentMethodInfo: PaymentMethod;

    @ManyToOne(type=>PaymentTerms, payter=>payter.styleOrderInfo,{  nullable:false, })
    @JoinColumn({ name:"Payment_terms_id"})
    paymentTermsInfo: PaymentTerms;

    @ManyToOne(type=>Buyers, buyer=>buyer.styleOrderInfo,{  nullable:false, })
    @JoinColumn({ name:"buyer_id"})
    buyerInfo: Buyers;

    @ManyToOne(type=>CoTypes, cotype=>cotype.styleOrderInfo,{  nullable:false, })
    @JoinColumn({ name:"co_type_id"})
    coTypeInfo: CoTypes;

    @ManyToOne(type=>UomEntity, uom=>uom.styleOrderInfo,{  nullable:true, })
    @JoinColumn({ name:"quantity_uom_id"})
    uomInfo: UomEntity;

    @OneToMany(type=>OrderLine, co=>co.styleOrderInfo,{cascade: true})
    orderLineInfo:OrderLine[];

    @OneToMany(type=>CoBom, co=>co.orderId,{cascade:true})
    customerorder:CoBom


    @OneToMany(type=>CoLine, co=>co.styleOrderInfo,{cascade: true})
    CoLineData:CoLine[];
    
}