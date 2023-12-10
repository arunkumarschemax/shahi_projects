import { CurrentPalletLocationEnum, CurrentPalletStateEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('pallets')
export class PalletsEntity {
    @PrimaryGeneratedColumn("increment", { name: 'pallet_id' })
    palletId: number;

    @Column('varchar', {
        name: 'pallet_name',
        length:20,
        nullable:false,
    })
    palletName: string

    @Column('int', {
        name: 'max_items',
        nullable:false,
    })
    maxItems: number;

    @Column('varchar', {
        name: 'pallet_code',
        length:50,
        nullable:false,
    })
    palletCode: string

    @Column('int', {
        name: 'fabric_capacity',
        nullable:false,
    })
    fabricCapacity: number

    @Column('varchar', {
        name: 'fabric_uom',
        length:50,
        nullable:false,
    })
    fabricUom: string

    @Column('varchar', {
        name: 'weight_capacity',
        length:50,
        nullable:false,
    })
    weightCapacity: string

    @Column('varchar', {
        name: 'weight_uom',
        length:50,
        nullable:false,
    })
    weightUom: string

    @Column('varchar', {
        name: 'current_bin_id',
        length:50,
        nullable:false,
    })
    currentBinId: string

    @Column('enum', {
        name: 'current_pallet_state',
        enum: CurrentPalletStateEnum
    })
    currentPalletState: CurrentPalletStateEnum

    @Column('enum', {
        name: 'current_pallet_location',
        enum: CurrentPalletLocationEnum,
        default: CurrentPalletLocationEnum.NONE
    })
    currentPalletLocation: CurrentPalletLocationEnum

    @Column('varchar', {
        name: 'barcode_id',
        length:50,
        nullable:false,
    })
    barcodeId: string

    @Column("boolean", {
        nullable: false,
        default: true,
        name: "is_active"
      })
      isActive: boolean;
    
      @Column("varchar", {
        nullable: true,
        name: "created_user"
      })
      createdUser: string | null;
    
      @Column("varchar", {
        nullable: true,
        name: "updated_user"
      })
      updatedUser: string | null;
    
      @CreateDateColumn({
        name: 'created_at'
      })
      createdAt: string;
    
      @UpdateDateColumn({
        name: 'updated_at'
      })
      updatedAt: string;
    
      @VersionColumn({
        default: 1,
        name: 'version_flag'
      })
      versionFlag: number;
    
}
