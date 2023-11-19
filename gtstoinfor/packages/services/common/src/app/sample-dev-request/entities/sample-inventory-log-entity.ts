import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Size } from "../../sizes/sizes-entity";
import { Location } from "../../locations/location.entity";
import { OperationInventory } from "../../operation-tracking/entity/operation-inventory-entity";

@Entity('sample_inventory_log')
export class SampleInventoryLogEntity {
    @PrimaryGeneratedColumn("increment", {
        name: 'sample_inventory_log_id'
    })
    sampleinventorylog: number;

    @Column("varchar", {
        nullable: true,
        name: "quantity",
        length: 50
    })
    quantity: number;


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

    @ManyToOne(type => Size, size => size.sInventory)
    @JoinColumn({ name: 'size_id' })
    size: Size

    @ManyToOne(Type => Location, location => location.sampleinventory)
    @JoinColumn({ name: 'location_id' })
    locationName: Location

    @ManyToOne(Type =>OperationInventory,operation=>operation.operationinventort)
    @JoinColumn({name:'operation_inventory_id'})
    operation:OperationInventory
}