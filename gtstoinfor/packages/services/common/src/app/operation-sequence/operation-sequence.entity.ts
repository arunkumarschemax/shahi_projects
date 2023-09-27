import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn,ManyToOne, JoinColumn } from "typeorm";
import { OperationGroups } from "../operation-groups/operation-groups.entity";
import { Operations } from "../operations/operation.entity";
import { Item } from "../items/item-entity";
import { Style } from "../style/dto/style-entity";

@Entity('operation_sequence')
export class OperationSequence{
    @PrimaryGeneratedColumn('increment',{
        name:'operation_sequence_id'
    })
    operationSequenceId:number;

    @Column('varchar',{
        nullable:false,
        name:'style'
    })
    style: string;

    @Column('varchar',{
        nullable:false,
        name:'operation_group_name'
    })
    operationGroupName:string;

    @Column('varchar',{
        nullable:false,
        name:'operation_name'
    })
    operationName:string;

    @Column('int',{
        nullable:false,
        name:'sequence'
    })
    sequence:number;

    @Column("boolean",{
    nullable:false,
    default:true,
    name:"is_active"
    })
    isActive:boolean;

    @CreateDateColumn({
    name: "created_at",
    type:"datetime"
    })
    createdAt: Date;

    @Column("varchar", {
        nullable: false,
        name: "created_user",
        default: "ADMIN",
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

    @ManyToOne(type=>OperationGroups, opegroup=>opegroup.operationGroupSequenceInfo,{  nullable:false, })
    @JoinColumn({ name:"operation_group_id"})
    operationGroupInfo: OperationGroups;

    @ManyToOne(type=>Operations, operation=>operation.operationSequenceInfo,{  nullable:false, })
    @JoinColumn({ name:"operation_id"})
    operationsInfo: Operations;

    // @ManyToOne(type=>Item, item=>item.itemsequenceInfo,{  nullable:false, })
    // @JoinColumn({ name:"item_id"})
    // itemInfo: Item;

    @ManyToOne(type=>Style, st=>st.itemsequenceInfo,{  nullable:false, })
    @JoinColumn({ name:"style_id"})
    styleInfo: Style;


}
