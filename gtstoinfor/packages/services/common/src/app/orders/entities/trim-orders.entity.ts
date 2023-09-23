import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('trim_orders') //change the name
export class TrimOrdersEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'trim_order_id',
    })
    trimOrderId: string
    @Column('varchar', {
        nullable: true,
        name: "order_no",
        length: 30
    })
    orderNo: string;
    @Column('varchar', {
        nullable: true,
        name: "year",
        length: 20
    })
    year: string;
    @Column('varchar', {
        nullable: true,
        name: "revision_no",
        length: 10
    })
    revisionNo: string;
    @Column('varchar', {
        nullable: true,
        name: "planning_ssn",
        length: 10
    })
    planningSsn: string;
    @Column('varchar', {
        nullable: true,
        name: "global_business_unit",
        length: 20
    })
    globalBusinessUnit: string;
    @Column('varchar', {
        nullable: true,
        name: "business_unit",
        length: 20
    })
    businessUnit: string;
    @Column('varchar', {
        nullable: true,
        name: "item_brand",
        length: 10
    })
    itemBrand: string;
    @Column('varchar', {
        nullable: true,
        name: "department",
        length: 50
    })
    Department: string;
    @Column('varchar', {
        nullable: true,
        name: "revised_date",
        length: 20
    })
    revisedDate: string;
    @Column('varchar', {
        nullable: true,
        name: "document_status",
        length: 100
    })
    DocumentStatus: string;
    @Column('varchar', {
        nullable: true,
        name: "answered_status",
        length: 15
    })
    answeredStatus: string;
    @Column('varchar', {
        nullable: true,
        name: "vendor_person_incharge",
        length: 100
    })
    vendorPersoninCharge: string;
    @Column('varchar', {
        nullable: true,
        name: "decision_date",
        length: 15
    })
    decisionDate: string;
    
    @Column('varchar', {
        nullable: true,
        name: "payment_terms",
        length: 50
    })
    paymentTerms: string;
    @Column('varchar', {
        nullable: true,
        name: "contracted_etd",
        length: 15
    })
    contractedETD: string;
    @Column('varchar', {
        nullable: true,
        name: "eta_wh",
        length: 15
    })
    ETAWH: string;
    @Column('varchar', {
        nullable: true,
        name: "approver",
        length: 50
    })
    approver: string;
    @Column('varchar', {
        nullable: true,
        name: "approval_date",
        length: 15
    })
    approvalDate: string;
    @Column('varchar', {
        nullable: true,
        name: "order_conditions",
        length: 50
    })
    orderConditions: string;
    @Column('varchar', {
        nullable: true,
        name: "remark",
        length: 100
    })
    remark: string;
    @Column('varchar', {
        nullable: true,
        name: "raw_material_code",
        length: 20
    })
    rawMaterialCode: string;
    @Column('varchar', {
        nullable: true,
        name: "supplier_raw_material_code",
        length: 255
    })
    supplierRawMaterialCode: string;
    @Column('varchar', {
        nullable: true,
        name: "supplier_raw_material",
        length: 255
    })
    supplierRawMaterial: string;
    @Column('varchar', {
        nullable: true,
        name: "vendor_code",
        length: 20
    })
    vendorCode: string;
    @Column('varchar', {
        nullable: true,
        name: "vendor",
        length: 50
    })
    vendor: string;
    @Column('varchar', {
        nullable: true,
        name: "management_factory_code",
        length: 20
    })
    managementFactoryCode: string;
    @Column('varchar', {
        nullable: true,
        name: "management_factory",
        length: 100
    })
    managementFactory: string;
    @Column('varchar', {
        nullable: true,
        name: "branch_factory_code",
        length: 10
    })
    branchFactoryCode: string;
    @Column('varchar', {
        nullable: true,
        name: "branch_factory",
        length: 100
    })
    branchFactory: string;
    @Column('varchar', {
        nullable: true,
        name: "order_plan_number",
        length: 20
    })
    orderPlanNumber: string;
    @Column('varchar', {
        nullable: true,
        name: "item_code",
        length: 20
    })
    itemCode: string;
    @Column('varchar', {
        nullable: true,
        name: "item",
        length: 40
    })
    item: string;
    @Column('varchar', {
        nullable: true,
        name: "representative_sample_code",
        length: 20
    })
    representativeSampleCode: string;
    @Column('varchar', {
        nullable: true,
        name: "sample_code",
        length: 20
    })
    sampleCode: string;
    @Column('varchar', {
        nullable: true,
        name: "color_code",
        length: 10
    })
    colorCode: string;
    @Column('varchar', {
        nullable: true,
        name: "color",
        length: 15
    })
    color: string;
    @Column('varchar', {
        nullable: true,
        name: "pattern_dimension_code",
        length: 40
    })
    patternDimensionCode: string;
    @Column('varchar', {
        nullable: true,
        name: "size_code",
        length: 20
    })
    sizeCode: string;
    @Column('varchar', {
        nullable: true,
        name: "size",
        length: 10
    })
    size: string;
    @Column('int', {
        nullable: true,
        name: "order_qty_pcs",
    })
    orderQtyPcs: number;
    @Column('varchar', {
        nullable: true,
        name: "arrangement_by",
        length: 30
    })
    arrangementBy: string;
    @Column('varchar', {
        nullable: true,
        name: "trim_description",
        length: 100
    })
    trimDescription: string;
    @Column('varchar', {
        nullable: true,
        name: "trim_item_no",
        length: 100
    })
    trimItemNo: string;
    @Column('varchar', {
        nullable: true,
        name: "trim_supplier",
        length: 50
    })
    trimSupplier: string;
    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'created_user'
    })
    createdUser: string | null;

    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'updated_user'
    })
    updatedUser: string | null;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;

    @Column('int', {
        nullable: true,
        name: 'version',
    })
    version: number;
    @Column('int', {
        nullable:true,
        name: 'file_id',
    })
    fileId : number;

    @Column('int', {
        nullable:true,
        name: 'month',
    })
    month : number;
    @Column('varchar', {
        nullable: true,
        name: "buyer_item_number",
        length: 50
    })
    buyerItemNumber: string;

}