import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn,ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { MaterialFabricEntity } from "./material-fabric-entity";
import { MaterialTrimEntity } from "./material-trim-entity";

@Entity('material_issue_log')
export class MaterialIssueLogEntity{
    
    @PrimaryGeneratedColumn('increment',{
        name:'material_issue_log_id'
    })
    materialIssueLogId:number;

    
    @Column('int',{
        nullable:false,
        name:'material_allocation_id'
    })
    materialAllocationId:number;

    @Column('varchar',{
        nullable:false,
        name:'item_type'
    })
    itemType:string;

    @Column('int',{
        name:'sample_order_id',
        nullable:false,
      })
      sampleOrderId:number

      
    @Column('int',{
        name:'sample_item_id',
        nullable:false,
      })
      sampleItemId:number

      @Column('int',{
        name:'m3_item_id',
        nullable:false,
      })
      m3ItemId:number

      @Column("int", {
        nullable: false,
        name: "quantity",
        
    })
     quantity: number;

     @Column('int',{
        name:'stock_id',
        nullable:false,
      })
      stockId:number

      @Column('int',{
        name:'location_id',
        nullable:false,
      })
      locationId:number

      @Column('varchar',{
        nullable:false,
        name:'location'
    })
      loction:string;


      @Column('int',{
        name:'allocate_quantity',
        nullable:false,
      })
      allocateQuantity:number

      @Column('int',{
        name:'buyer_id',
        nullable:false,
      })
      buyerId:number


      @Column('varchar',{
        nullable:false,
        name:'buyer'
    })
    buyer:string;

    @Column('varchar',{
      nullable:false,
      name:'request_no'
  })
  requestNo:string;



    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: string;

    @Column("varchar", {
        nullable: true,
        length: 40,
        name: "created_user",
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: string;

    @Column("varchar", {
        nullable: true,
        length: 40,
        name: "updated_user",
    })
    updatedUser: string | null;

    @VersionColumn({
        default: 1,
        name: "version_flag",
    })
    versionFlag: number;

    
}
