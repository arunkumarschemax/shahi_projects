import { GRNTypeEnum, StockTypeEnum } from "@project-management-system/shared-models";
import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("stocks")
export class StocksEntity extends CommonColumns {
      @Column('int',{
        name:'m3_item',
        nullable:false
    })
    m3Item:number;

    @Column('int',{
        name:'buyer_id',
        nullable:false
    })
    buyerId:number;

    @Column('int',{
        name:'uom_id',
        nullable:false
    })
    uomId:number;

    @Column('int',{
        name:'pallet_id',
        nullable:false
    })
    palletId:number;

    @Column('varchar', {
        nullable: false,
        length: 30,
        name: 'item_type',
      })
    itemType: string;

    @Column({
        name: "location_id",
    })
    locationId: number;

    @Column('int',{
        name: "quantity",
        default:0
    })
    quantity: number;

    @Column('int',{
        name: "style_id",
    })
    styleId: number;

    @Column({
        name: "grn_item_id",
    })
    grnItemId: number;


    @Column({
        name: "allocatd_quantity",
        default:0
    })
    allocateQuanty: number;

    @Column({
        name: "transfered_quantity",
        default:0
    })
    transferedQuantity: number;

    @Column({
        name: "issued_quantity",
        default:0
    })
    issuedQuantity: number;

    @Column({
        name: "stock_bar_code",
    })
    stockBarCode: string;
    
    @Column('enum', {
        name: 'grn_type',
        nullable: false,
        enum: GRNTypeEnum
      })
      grnType: GRNTypeEnum
    
      @Column('int',{
        nullable: true,
        name: "sample_item_id",
    })
    sampleItemId: number;
    @Column('int',{
        nullable: true,
        name: "sample_req_id",
    })
    sampleReqId: number;

    @Column('enum',{
        name:'stock_type',
        nullable: false,
        enum:StockTypeEnum,
        default:StockTypeEnum.STOCK
      })
      stockType: StockTypeEnum;

}