import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("stock_log")
export class StockLogEntity{

    @PrimaryGeneratedColumn('increment',{
        name:'stock_log_id'
    })
    stockLogId:number
    
    @Column('int',{
        name:'stock_id',
        nullable:false
    })
    stockId:number;

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
    
    @Column({
        name: "grn_item_id",
    })
    grnItemId: number;

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