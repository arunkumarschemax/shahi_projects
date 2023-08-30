import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { CommonColumns } from "./common-columns.entity";


@Entity('bom_trim')
export class BomTrimCreationEntity  {
    @PrimaryGeneratedColumn('increment',{
        name:'bom_trim_id'
    })
    bomTrimId : number;

    @Column('varchar',{
        name:'trim_code'
    })
    trimCode : string;

    @Column('varchar',{
        name:'trim'
    })
    trim : string;

    @Column('varchar',{
        name:'generic_code'
    })
    genericCode : string;

    
    @Column('varchar',{
        name:'type'
    })
    type : string;

    
    @Column('varchar',{
        name:'group'
    })
    group: string;

    
    @Column('varchar',{
        name:'use_in_operation'
    })
    useInOperation : string;

    @Column('varchar',{
        name:'description'
    })
    description : string;

    @Column('varchar',{
        name:'responsible'
    })
    responsible : string;

    @Column('varchar',{
        name:'development_responsible'
    })
    developmentResponsible : string;

    @Column('varchar',{
        name:'basic_uom'
    })
    basicUom : string;

    @Column('varchar',{
        name:'alternate_uom'
    })
    alternateUom : string;

    @Column('varchar',{
        name:'factor'
    })
    factor : string; 

    @Column('varchar',{
        name:'order_multiple_buom'
    })
    orderMultipleBuom : string;


    @Column('varchar',{
        name:'moq'
    })
    moq : string;

    @Column('varchar',{
        name:'order_multiple_Auom'
    })
    orderMultipleAuom : string;

    @Column('varchar',{
        name:'currency'
    })
    currency : string;

    @Column('varchar',{
        name:'price'
    })
      price : string;
    

    @Column('varchar',{
        name:'purchase_price_quantity'
    })
     purchasePriceQuantity : string;
   
    
      @Column('varchar',{
        name:'sales_tax'
    })
      salesTax : string;
   
      
    @Column('varchar',{
        name:'excise_duty'
    })
      exciseDuty : string;  

      @Column('varchar',{
        name:'licence'
    })
      licence : string;

      @Column('varchar',{
        name:'property'
    })
      property : string;

      @Column('varchar',{
        name:'is_sale_item'
    })
      isSaleItem : string;


      @Column('varchar',{
        name:'consumption'
    })
      consumption : string;

      @Column('varchar',{
        name:'wastage_percentage'
    })
      wastagePercentage : string;

      @Column('varchar',{
        name:'cost_group'
    })
      costGroup : string;


      @Column('varchar',{
        name:'usage_remarks'
    })
       usageRemarks: string;      
    
     // common column

       @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'created_user'
    })
    createdUser: string | null;
 
    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'updated_user'
    })
    updatedUser: string | null;

    @VersionColumn({
        default: 1,
        name: 'version_flag'
    })
    versionFlag: number;

    @Column('boolean', {
        nullable: false,
        name: 'is_active',
        default: true
    })
    isActive: boolean;

}