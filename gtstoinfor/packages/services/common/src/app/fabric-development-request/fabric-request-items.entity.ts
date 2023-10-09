import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { FabricRequestQualitiesInfoEntity } from "./fabric-request-quality-info.entity";

@Entity('fabric_req_items')
export class FabricRequestItemsEntity {

    @PrimaryGeneratedColumn("increment", { name: 'fabric_req_items_id' })
    fabricRequestItemsId: number;

    @Column('varchar', {
        name: 'item_code',
        nullable: true,
        length:150
        
    })
    itemCode: string;

    @Column('varchar', {
        name: 'description',
        nullable: true,
        
    })
    description: string;

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


    @ManyToOne((type) => FabricRequestQualitiesInfoEntity, (FabricInfoEntity) => FabricInfoEntity.fabricItemsEntity, { nullable: false })
    @JoinColumn({ name: "fabric_req_quality_info_id" })
    data:FabricRequestQualitiesInfoEntity;

  

}
