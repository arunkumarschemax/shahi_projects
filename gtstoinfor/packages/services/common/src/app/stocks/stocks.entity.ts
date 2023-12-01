import { StockTypeEnum } from "@project-management-system/shared-models";
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
    })
    allocateQuanty: number;

    @Column({
        name: "transfered_quantity",
    })
    transferedQuantity: number;

    @Column({
        name: "issued_quantity",
    })
    issuedQuantity: number;

    @Column({
        name: "stock_bar_code",
    })
    stockBarCode: string;

    @Column('enum',{
        name:'stock_type',
        nullable: false,
        enum:StockTypeEnum,
        default:StockTypeEnum.STOCK
      })
      stockType: StockTypeEnum;

}