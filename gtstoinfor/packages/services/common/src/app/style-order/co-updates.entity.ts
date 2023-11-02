import { CustomerOrderStatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";


@Entity('co_updates')
export class CoUpdateEntity{

    @PrimaryGeneratedColumn("increment",{
        name:'co_update_id'
    })
    coUpdateId:number;


    @Column('varchar',{
        name:'co_number',
        nullable:false,
    })
    coNumber : string;

    @Column('int',{
        name:'co_line_id',
        nullable:false
    })
    coLineId: number;

    @Column('int',{
        name:'co_id',
        nullable:false
    })
    coId:number;


    @Column('varchar',{
        name:'old_value',
        nullable:false,
    })
    oldValue : string;

    @Column('varchar',{
        name:'updated_value',
        nullable:false,
    })
    updatedValue : string;


    @Column('varchar',{
        name:'parameter',
        nullable:false,
    })
    parameter : string;


    @CreateDateColumn({
    name: "created_at",
    type:"datetime"
    })
    createdAt: Date;

    @Column("varchar", {
        nullable: false,
        name: "created_user",
        default:"ADMIN",
        length:50
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: "updated_at",
        type:'datetime'
    })
    updatedAt: Date;

    @Column("varchar", {
        nullable: true,
        name: "updated_user",
        length:50
    })
    updatedUser: string | null;

    @VersionColumn({
        default:1,
        name: "version_flag"
    })
    versionFlag: number;

    

}