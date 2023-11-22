import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("stock_log")
export class StockLogEntity{

    @PrimaryGeneratedColumn('increment',{
        name:'stock_log_id'
    })
    stockLogId:number
    
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
        name: "grn_item_id",
    })
    grnItemId: number;

    @Column({
        name: "buyer_id",
    })
    buyer_id: number;

    @Column({
        name: "quantity",
        length: 50,
    })
    quantity: string;

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

}