import { QualitiesEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { FabricRequestQualitiesInfoEntity } from "./fabric-request-quality-info.entity";
import { FabricRequestEntity } from "./fabric-request.entity";


@Entity('fabric_req_qualities')
export class FabricRequestQualitiesEntity {
    
   @PrimaryGeneratedColumn("increment", { name: 'fabric_req_quality_id' })
    fabricRequestQualityId: number;

    @Column('enum', {
      name: 'quality',
      nullable: false,
      enum: QualitiesEnum
    })

    quality: QualitiesEnum;

    @Column('varchar', {
        name: 'placement',
        nullable: true,
        length:150
        
    })
    placement: string;


    @Column('int', {
        name: 'width',
        nullable: true,
        
    })
    width: number;

    @Column('varchar', {
        name: 'fabric_description',
        nullable: true,
     
    })
    fabricDescription: string;

    @Column('varchar', {
        name: 'description',
        nullable: true,
        
    })
    description: string;

    @Column('varchar', {
        name: 'fabric_code',
        nullable: true,
        
    })
    fabricCode: string;

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


    @OneToMany(() => FabricRequestQualitiesInfoEntity, FabricQualitiesEntity => FabricQualitiesEntity.data, { cascade: true })
    fabricEntity:FabricRequestQualitiesInfoEntity[]
  
    @ManyToOne((type) => FabricRequestEntity, (Fabric) => Fabric.fabricQuantityEntity, { nullable: false })
    @JoinColumn({ name: "fabric_request_id" })
    data:FabricRequestEntity;
    



}
