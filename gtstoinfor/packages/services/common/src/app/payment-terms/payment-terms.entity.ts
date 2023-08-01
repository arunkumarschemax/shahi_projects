import { PaymentTermsCategory } from "@project-management-system/shared-models";
import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
@Entity('payment_terms')
export class PaymentTerms {

  @PrimaryGeneratedColumn("increment",{name:'payment_terms_id'})
  paymentTermsId:number;
  
  @Column({
    type: "enum",
    enum: PaymentTermsCategory,
    default: PaymentTermsCategory.Customer,
    name:'payment_terms_category'
})
paymentTermsCategory: PaymentTermsCategory;

  @Column("varchar",{
      nullable:false,
      length:100,
      name:"payment_terms_name"
      })
  @Index({unique:false})
  paymentTermsName:string;

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
      nullable: true,
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
