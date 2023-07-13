import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('file_upload') //change the name
export class OrdersEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'id',
    })
    id: string

    @Column('varchar', {
        nullable: true,
        name: "file_name",
        length: 250
    })
    fileName: string;

    @Column('varchar', {
        nullable: true,
        name: "file_path",
    })
    filePath: string;

    @Column('varchar', {
        name: 'uploaded_date',
        length: 10
    })
    uploadedDate: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'created_user'
    })
    createdUser: string | null;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'updated_user'
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

}