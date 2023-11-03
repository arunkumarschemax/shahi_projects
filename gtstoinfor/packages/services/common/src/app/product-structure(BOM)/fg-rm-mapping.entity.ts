import { Column, CreateDateColumn, Entity,PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('fg_rm_mapping')
export class FgRmMappingEntity {

    @PrimaryGeneratedColumn("increment", { name: 'fg_rm_id' })
    FgRmId: number;
  
    @Column("int", {
      nullable: false,
      name: "fg_item_id"
    })
    fgitemId: number;

    
    @Column("varchar", {
        nullable: false,
        name: "fg_item_code"
      })
    fgitemCode: string; 
    
    @Column("int", {
        nullable: false,
        name: "rm_item_id"
      })
     rmitemId: number;
    
    @Column("varchar", {
        nullable: false,
        name: "rm_item_code"
      })
    rmitemCode: string; 


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


  
  }
  