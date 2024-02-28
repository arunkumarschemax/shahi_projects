import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('destination')
export class DestinationEntity {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    destinationId: number;

    @Column({ type: 'varchar', length: 100, nullable: true, collation: 'latin1_swedish_ci' })
    geoCode: string;

    @Column({ type: 'varchar', length: 100, nullable: true, collation: 'latin1_swedish_ci' })
    destination: string;

    @Column({ type: 'varchar', length: 100, nullable: true, collation: 'latin1_swedish_ci' })
    dpomGeoCode: string;

    @CreateDateColumn({ type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @Column({ type: 'varchar', length: 250, nullable: true, collation: 'latin1_swedish_ci' })
    createdUser: string;

    @UpdateDateColumn({ type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    @Column({ type: 'varchar', length: 250, nullable: true, collation: 'latin1_swedish_ci' })
    updatedUser: string;

    @Column({ type: 'int', default: 1 })
    versionFlag: number;

    @Column({ type: 'tinyint', default: 1 })
    isActive: boolean;
}
