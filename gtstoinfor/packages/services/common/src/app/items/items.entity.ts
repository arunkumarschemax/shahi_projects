import {Column,Entity,PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";


@Entity('items')
export class Items {

@PrimaryGeneratedColumn("increment",{name:'item_id'})
itemId:number;

@Column("char",{
nullable:false,
length:50,
name:"item"
})
item:string;

@Column("char",{
nullable:false,
length:50,
name:"consumption_required"
})
consumptionrequired:string;

@Column("char",{
nullable:false,
length:50,
name:"consumption"
})
consumption:string;

@Column("char",{
  nullable:false,
  length:50,
  name:"wastage"
  })
wastage:string;


@Column("char",{
  nullable:false,
  length:50,
  name:"moq"
  })
moq:string;

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
