import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, Entity } from "typeorm";

@Entity("stocks")
export class StocksEntity extends CommonColumns {
    @Column({
        name: "m3_style_id",
    })
    m3_style_id: number;

    @Column({
        name: "item_type_id",
    })
    item_type_id: number;

    @Column({
        name: "item_id",
    })

    item_id: number;
    @Column({
        name: "location_id",
    })
    location_id: number;

    @Column({
        name: "quantity",
    })
    quantity: number;

    @Column({
        name: "style_id",
    })
    style_id: number;
}