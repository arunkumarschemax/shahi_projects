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

    @Column({
        name: "quantity",
    })
    quantity: number;

}