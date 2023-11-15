import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { CommonColumns } from "./common-columns.entity";
import { IsImportedItemEnum } from "@project-management-system/shared-models";


@Entity('bom_trim')
export class BomTrimEntity  {
    @PrimaryGeneratedColumn('increment',{
        name:'id'
    })
    id : number;

    @Column('varchar',{
        name:'item_type_id'
    })
    itemTypeId : number;

    @Column('varchar',{
        name:'pch_id'
    })
    pchId : number;

    @Column('varchar',{
        name:'facility_id'
    })
    facilityId : number;


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

    
    // @Column('int',{
    //     name:'type_id'
    // })
    // typeId : number;

    
    @Column('int',{
        name:'product_group_id'
    })
    productGroupId: number;

    
    @Column('int',{
        name:'use_in_operation_id'
    })
    useInOperationId : number;

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

    @Column('int',{
        name:'basic_uom_id'
    })
    basicUomId : number;

    @Column('int',{
        name:'alternate_uom_id'
    })
    alternateUomId : number;

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

    @Column('int',{
        name:'currency_id'
    })
    currencyId : number;

    @Column('int',{
        name:'price'
    })
      price : number;

      @Column('int',{
        name:'tax_percentage'
    })
      taxPercentage : number;

      @Column('decimal',{
        name:'total_price',
        precision: 5, 
        scale: 2,
    })
      totalPrice : number;
    

    @Column('int',{
        name:'purchase_price_quantity'
    })
     purchasePriceQuantity : number;
   
    
      @Column('varchar',{
        name:'sales_tax',
        nullable:true
    })
      salesTax : string;
   
      
    @Column('varchar',{
        name:'excise_duty'
    })
      exciseDuty : string;  

      @Column('int',{
        name:'licence_id'
    })
      licenceId : number;

      @Column('varchar',{
        name:'property'
    })
      property : string;

      @Column('enum',{
        name:'is_sale_item',
        enum:IsImportedItemEnum,
       default:IsImportedItemEnum.NO,

    })
      isSaleItem :IsImportedItemEnum;


      @Column('int',{
        name:'consumption'
    })
      consumption : number;

      @Column('int',{
        name:'wastage_percentage'
    })
      wastagePercentage : number;

      @Column('varchar',{
        name:'cost_group'
    })
      costGroup : string;


      @Column('varchar',{
        name:'usage_remarks'
    })
       usageRemarks: string;  
       
    @Column('enum',{
        name:'is_imported_item',
       enum:IsImportedItemEnum,
      default:IsImportedItemEnum.NO,
     })
     isImportedItem:IsImportedItemEnum;
    
     @Column('varchar',{
        name:'item_group'
    })
       itemGroup: string; 

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



}