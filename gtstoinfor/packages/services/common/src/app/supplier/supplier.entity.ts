// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonColumns } from 'packages/services/common/common-columns.entity';
import { Column, Entity, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, VersionColumn,PrimaryGeneratedColumn } from 'typeorm';

@Entity('supplier') 
export class SupplierEntity  extends CommonColumns {

    // @PrimaryGeneratedColumn("increment", { name: 'id' })
    // id: number;

    @Column('varchar', {
        name: 'category',
        length: 255
    })
    category: string;

    @Column('varchar', {
        name: 'supplier_code',
        length: 255
    })
    supplierCode: string;

    @Column('varchar', {
        name: 'supplier_name',
        length: 255
    })
    supplierName: string;

    @Column('varchar', {
      name: 'gst_number',
      length: 255
  })
  GstNumber: string;

  @Column('varchar', {
    name: 'contact_person',
    length: 255
})
contactPerson: string;


  @Column('varchar', {
    name: 'street',
    length: 255
})
street: string;


@Column('varchar', {
  name: 'apartment',
  length: 255
})
apartment: string;


@Column('varchar', {
  name: 'city',
 
})
city: string;


@Column('varchar', {
  name: 'state',
 
})
state: string;


@Column('varchar', {
  name: 'district',
 
})
district: string;

@Column('int', {
  name: 'postal_code',
 
})
postalCode: number;

@Column('varchar', {
  name: 'commission',
 
})
commision: string;

@Column('varchar', {
  name: 'bank_account_no',
 
})
bankAccountNo: number;

@Column('varchar', {
  name: 'bank_ifsc',
 
})
bankIFSC: string;

@Column('varchar', {
  name: 'bank_name',
 
})
bankName: string;

@Column('varchar', {
  name: 'bank_branch',
 
})
bankBranch: string;

@Column('varchar', {
  name: 'contact_number',
 
})
contactNumber: number;

@Column('varchar', {
  name: 'email',
 
})
email: string;

@Column('varchar', {
  name: 'credit_payment_period',
 
})
creditPaymentPeriod: number;

}