
import { Column,  PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export class CommonColumns { 

    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;
    
    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'created_user'
    })
    createdUser: string | null;
 
    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'updated_user'
    })
    updatedUser: string | null;

    @VersionColumn({
        default: 1,
        name: 'version_flag'
    })
    versionFlag: number;

    @Column('boolean', {
        nullable: false,
        name: 'is_active',
        default: true
    })
    isActive: boolean;

}
