import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class TrimOrderDto {
   
    @ApiProperty()
    trimOrderId: number
    @ApiProperty()
    orderNo: string;
    @ApiProperty()
    year: string;
    @ApiProperty()
    revisionNo: string;
    @ApiProperty()
    planningSsn: string;
    @ApiProperty()
    globalBusinessUnit: string;
    @ApiProperty()
    businessUnit: string;
    @ApiProperty()
    itemBrand: string;
    @ApiProperty()
    Department: string;
    @ApiProperty()
    revisedDate: string;
    @ApiProperty()
    DocumentStatus: string;
    @ApiProperty()
    answeredStatus: string;
    @ApiProperty()
    vendorPersoninCharge: string;
    decisionDate: string;
    @ApiProperty()
    paymentTerms: string;
    @ApiProperty()
    contractedETD: string;
    @ApiProperty()
    ETAWH: string;
    @ApiProperty()
    approver: string;
    @ApiProperty()
    approvalDate: string;
    @ApiProperty()
    orderConditions: string;
    @ApiProperty()
    remark: string;
    @ApiProperty()
    rawMaterialCode: string;
    @ApiProperty()
    supplierRawMaterialCode: string;
    @ApiProperty()
    supplierRawMaterial: string;
    @ApiProperty()
    vendorCode: string;
    @ApiProperty()
    vendor: string;
    @ApiProperty()
    managementFactoryCode: string;
    @ApiProperty()
    managementFactory: string;
    @ApiProperty()
    branchFactoryCode: string;
    @ApiProperty()
    branchFactory: string;
    @ApiProperty()
    orderPlanNumber: string;
    @ApiProperty()
    itemCode: string;
    @ApiProperty()
    item: string;
    @ApiProperty()
    representativeSampleCode: string;
    @ApiProperty()
    sampleCode: string;
    @ApiProperty()
    colorCode: string;
    @ApiProperty()
    color: string;
    @ApiProperty()
    patternDimensionCode: string;
    @ApiProperty()
    sizeCode: string;
    @ApiProperty()
    size: string;
    @ApiProperty()
    orderQtyPcs:number;
    @ApiProperty()
    arrangementBy: string;
    @ApiProperty()
    trimDescription: string;
    @ApiProperty()
    trimItemNo: string;
    @ApiProperty()
    trimSupplier: string;
    @ApiProperty()
    createdUser: string | null;
    @ApiProperty()
    updatedUser: string | null;
    @ApiProperty()
    createdAt: string;
    @ApiProperty()
    updatedAt: string;
    @ApiProperty()
    version?: number;
    @ApiProperty()
    fileId?:number;
    @ApiProperty()
    month?:number;
    constructor( trimOrderId: number,
        orderNo: string,
        year: string,
        revisionNo: string,
        planningSsn: string,
        globalBusinessUnit: string,
        businessUnit: string,
        itemBrand: string,
        Department: string,
        revisedDate: string,
        DocumentStatus: string,
        answeredStatus: string,
        vendorPersoninCharge: string,
        decisionDate: string,
        paymentTerms: string,
        contractedETD: string,
        ETAWH: string,
        approver: string,
        approvalDate: string,
        orderConditions: string,
        remark: string,
        rawMaterialCode: string,
        supplierRawMaterialCode: string,
        supplierRawMaterial: string,
        vendorCode: string,
        vendor: string,
        managementFactoryCode: string,
        managementFactory: string,
        branchFactoryCode: string,
        branchFactory: string,
        orderPlanNumber: string,
        itemCode: string,
        item: string,
        representativeSampleCode: string,
        sampleCode: string,
        colorCode: string,
        color: string,
        patternDimensionCode: string,
        sizeCode: string,
        size: string,
        orderQtyPcs:number,
        arrangementBy: string,
        trimDescription: string,
        trimItemNo: string,
        trimSupplier: string,
        createdUser: string | null,
        updatedUser: string | null,
        createdAt: string,
        updatedAt: string,
        version?: number,
        fileId?:number,
        month?:number){
            this.trimOrderId = trimOrderId
            this.orderNo = orderNo
            this.year = year
            this.revisionNo = revisionNo
            this.planningSsn = planningSsn
            this.globalBusinessUnit = globalBusinessUnit
            this.businessUnit = businessUnit
            this.itemBrand = itemBrand
            this.Department = Department
            this.revisedDate = revisedDate
            this.DocumentStatus = DocumentStatus
            this.answeredStatus = answeredStatus
            this.vendorPersoninCharge = vendorPersoninCharge
            this.decisionDate = decisionDate
            this.paymentTerms = paymentTerms
            this.contractedETD = contractedETD
            this.ETAWH = ETAWH
            this.approver = approver
            this.approvalDate = approvalDate
            this.orderConditions = orderConditions
            this.remark = remark
            this.rawMaterialCode = rawMaterialCode
            this.supplierRawMaterialCode = supplierRawMaterialCode
            this.supplierRawMaterial = supplierRawMaterial
            this.vendorCode = vendorCode
            this.vendor = vendor
            this.managementFactoryCode = managementFactoryCode
            this.managementFactory = managementFactory
            this.branchFactoryCode = branchFactoryCode
            this.branchFactory = branchFactory
            this.orderPlanNumber = orderPlanNumber
            this.itemCode = itemCode
            this.item = item
            this.representativeSampleCode = representativeSampleCode
            this.sampleCode = sampleCode
            this.colorCode = colorCode
            this.color = color
            this.patternDimensionCode = patternDimensionCode
            this.sizeCode = sizeCode
            this.size = size
            this.arrangementBy = arrangementBy
            this.trimDescription = trimDescription
            this.trimItemNo = trimItemNo
            this.trimSupplier = trimSupplier
            this.createdUser = createdUser
            this.updatedUser = updatedUser
            this.createdAt = createdAt
            this.updatedAt = updatedAt
            this.version = version
            this.fileId = fileId;
            this.month=month
            this.orderQtyPcs=orderQtyPcs
    }

}