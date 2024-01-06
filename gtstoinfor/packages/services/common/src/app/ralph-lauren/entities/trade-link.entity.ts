import {  ItemStatusEnum } from "packages/libs/shared-models/src/Enum/item-status.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('trade_link')
export class tradeEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column("varchar", {
        name: "name",
    })
    name: string


    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: string;

    @Column("varchar", {
        nullable: true,
        length: 25,
        name: "created_user",
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: string;

    @Column("varchar", {
        nullable: true,
        length: 25,
        name: "updated_user",
    })
    updatedUser: string | null;

    @VersionColumn({
        default: 1,
        name: "version_flag",
    })
    versionFlag: number;

    @Column({
        nullable: false,
        name: "is_active",
        default: 1
    })
    isActive: boolean;

}