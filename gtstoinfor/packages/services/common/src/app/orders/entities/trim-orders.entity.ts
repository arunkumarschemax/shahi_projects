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
        length: '5'
    })
    orderNo: string;
    @Column('varchar', {
        nullable: true,
        name: "year",
        length: '5'
    })
    year: string;
    @Column('varchar', {
        nullable: true,
        name: "revision_no",
        length: '5'
    })
    revisionNo: string;
    @Column('varchar', {
        nullable: true,
        name: "planning_ssn",
        length: '5'
    })
    planningSsn: string;
    @Column('varchar', {
        nullable: true,
        name: "global_business_unit",
        length: '5'
    })
    global_business_unit: string;
    @Column('varchar', {
        nullable: true,
        name: "business_unit",
        length: '5'
    })
    businessUnit: string;
    @Column('varchar', {
        nullable: true,
        name: "item_brand",
        length: '5'
    })
    itemBrand: string;
    @Column('varchar', {
        nullable: true,
        name: "department",
        length: '5'
    })
    Department: string;
    @Column('varchar', {
        nullable: true,
        name: "revised_date",
        length: '5'
    })
    revisedDate: string;
    @Column('varchar', {
        nullable: true,
        name: "document_status",
        length: '5'
    })
    DocumentStatus: string;
    @Column('varchar', {
        nullable: true,
        name: "answered_status",
        length: '5'
    })
    answeredStatus: string;
    @Column('varchar', {
        nullable: true,
        name: "vendor_person_incharge",
        length: '5'
    })
    vendorPersoninCharge: string;
    @Column('varchar', {
        nullable: true,
        name: "decision_date",
        length: '5'
    })
    decisionDate: string;
    
    @Column('varchar', {
        nullable: true,
        name: "payment_terms",
        length: '5'
    })
    paymentTerms: string;
    @Column('varchar', {
        nullable: true,
        name: "contracted_etd",
        length: '5'
    })
    contractedETD: string;
    @Column('varchar', {
        nullable: true,
        name: "eta_wh",
        length: '5'
    })
    ETAWH: string;
    @Column('varchar', {
        nullable: true,
        name: "approver",
        length: '5'
    })
    approver: string;
    @Column('varchar', {
        nullable: true,
        name: "approval_date",
        length: '5'
    })
    approvalDate: string;
    @Column('varchar', {
        nullable: true,
        name: "order_conditions",
        length: '5'
    })
    orderConditions: string;
    @Column('varchar', {
        nullable: true,
        name: "remark",
        length: '5'
    })
    remark: string;
    @Column('varchar', {
        nullable: true,
        name: "raw_material_code",
        length: '5'
    })
    rawMaterialCode: string;
    @Column('varchar', {
        nullable: true,
        name: "supplier_raw_material_code",
        length: '5'
    })
    supplierRawMaterialCode: string;
    @Column('varchar', {
        nullable: true,
        name: "supplier_raw_material",
        length: '5'
    })
    supplierRawMaterial: string;
    @Column('varchar', {
        nullable: true,
        name: "vendor_code",
        length: '5'
    })
    vendorCode: string;
    @Column('varchar', {
        nullable: true,
        name: "vendor",
        length: '5'
    })
    vendor: string;
    @Column('varchar', {
        nullable: true,
        name: "management_factory_code",
        length: '5'
    })
    managementFactoryCode: string;
    @Column('varchar', {
        nullable: true,
        name: "management_factory",
        length: '5'
    })
    managementFactory: string;
    @Column('varchar', {
        nullable: true,
        name: "branch_factory_code",
        length: '5'
    })
    branchFactoryCode: string;
    @Column('varchar', {
        nullable: true,
        name: "branch_factory",
        length: '5'
    })
    branchFactory: string;
    @Column('varchar', {
        nullable: true,
        name: "order_plan_number",
        length: '5'
    })
    orderPlanNumber: string;
    @Column('varchar', {
        nullable: true,
        name: "item_code",
        length: '5'
    })
    itemCode: string;
    @Column('varchar', {
        nullable: true,
        name: "item",
        length: '5'
    })
    item: string;
    @Column('varchar', {
        nullable: true,
        name: "representative_sample_code",
        length: '5'
    })
    representativeSampleCode: string;
    @Column('varchar', {
        nullable: true,
        name: "sample_code",
        length: '5'
    })
    sampleCode: string;
    @Column('varchar', {
        nullable: true,
        name: "color_code",
        length: '5'
    })
    colorCode: string;
    @Column('varchar', {
        nullable: true,
        name: "color",
        length: '5'
    })
    color: string;
    @Column('varchar', {
        nullable: true,
        name: "pattern_dimension_code",
        length: '5'
    })
    patternDimensionCode: string;
    @Column('varchar', {
        nullable: true,
        name: "size_code",
        length: '5'
    })
    sizeCode: string;
    @Column('varchar', {
        nullable: true,
        name: "size",
        length: '5'
    })
    size: string;
    @Column('varchar', {
        nullable: true,
        name: "order_qty_pcs",
        length: '5'
    })
    orderQtyPcs: string;
    @Column('varchar', {
        nullable: true,
        name: "arrangement_by",
        length: '5'
    })
    arrangementBy: string;
    @Column('varchar', {
        nullable: true,
        name: "trim_description",
        length: '5'
    })
    trimDescription: string;
    @Column('varchar', {
        nullable: true,
        name: "trim_item_no",
        length: '5'
    })
    trimItemNo: string;
    @Column('varchar', {
        nullable: true,
        name: "trim_supplier",
        length: '5'
    })
    trimSupplier: string;
    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'created_user'
    })
    createdUser: string | null;

    @Column('varchar', {
        nullable: true,
        length: 40,
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

}