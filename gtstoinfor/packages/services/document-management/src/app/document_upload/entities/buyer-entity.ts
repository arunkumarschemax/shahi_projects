import { Column, Entity, Index, PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { CommonColumns } from "../../common/common-columns.entity";

@Entity('buyer')
export class BuyerEntity extends CommonColumns {

    @Column("varchar", {
        name: "buyer"
    })
    buyer: string;
}