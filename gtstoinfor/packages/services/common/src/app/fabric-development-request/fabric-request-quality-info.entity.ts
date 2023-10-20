import { StatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { FabricRequestQualitiesEntity } from "./fabric-request-qualities.entity";
import { FabricRequestItemsEntity } from "./fabric-request-items.entity";


@Entity('fabric_req_quality_info')
export class FabricRequestQualitiesInfoEntity {

    @PrimaryGeneratedColumn("increment", { name: 'fabric_req_quality_info_id' })
    fabricRequestQualityInfoId: number;

    @Column("int", {
        name: "style_id",

      })
    styleId: number;

    @Column("int", {
        name: "color_id",
        nullable: false,
      })
    colorId: number;

    @Column('int', {
        name: 'garment_quantity',
        nullable: false,
        
    })
    garmentQuantity:number;

    @Column('decimal', {
        name: 'consumption',
        nullable: false,
        
    })
    consumption:number;

    @Column('decimal', {
        name: 'wastage',
        nullable: false,
        
    })
    wastage:number;

    @Column('int', {
        name: 'fabric_quantity',
        nullable: false,
        
    })
    fabricQuantity:number;

    @Column('int', {
        name: 'uom_id',
        nullable: false,
        
    })
    uomId:number;

    @Column('varchar', {
      name: 'uid',
      nullable: true,
      
  })
    uid:string;

    
    @Column('varchar', {
        name: 'file_name',
        nullable: true
    })
    fileName: string;

    @Column('varchar', {
        name: 'file_path',
        nullable: true
    })
    filePath: string;


    @Column('enum', {
        name: 'status',
        nullable: false,
        enum: StatusEnum
    })
    status: StatusEnum;

    @Column('varchar', {
        name: 'remarks',
    })
    remarks: string;


    @CreateDateColumn({
        name: "created_at",
        type: "datetime"
      })
    createdAt: Date;
    
    @Column("varchar", {
        nullable: true,
        name: "created_user"
      })
    createdUser: string | null;
    
    
    @UpdateDateColumn({
        name: "updated_at",
        type: 'datetime'
      })
    updatedAt: Date;
    
    @Column("varchar", {
        nullable: true,
        name: "updated_user"
      })
    updatedUser: string | null;
    
    
    @VersionColumn({
        default: 1,
        name: "version_flag"
      })
    versionFlag: number;

    @ManyToOne((type) => FabricRequestQualitiesEntity, (FabricInfoEntity) => FabricInfoEntity.fabricEntity, { nullable: false })
    @JoinColumn({ name: "fabric_req_quality_id" })
    data:FabricRequestQualitiesEntity;
    

    @OneToMany(() => FabricRequestItemsEntity, FabricItemEntity => FabricItemEntity.data, { cascade: true })
    fabricItemsEntity:FabricRequestItemsEntity[]
  


}