import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, Entity } from "typeorm";

@Entity("stocks")
export class StocksEntity extends CommonColumns {
    @Column({
        name: "m3_item_code",
        length: 100,
    })
    m3ItemCode: string;

    @Column({
        name: "shahi_item_code",
        length: 100
    })
    shahiItemCode: string;

    @Column({
        name: "item_type_id",
    })
    item_type_id: number;

    @Column({
        name: "location_id",
    })
    location_id: number;

    @Column({
        name: "plant_id",
    })
    plant_id: number;

    @Column({
        name: "quantity",
        length: 50,
    })
    quantity: string;
}