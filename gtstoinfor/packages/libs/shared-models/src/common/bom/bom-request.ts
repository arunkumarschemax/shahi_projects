
export class BomRequest {
    
    bomTrimId:number;
    trimCode :string;
    trim :string;
    genericCode: string;
    type: string;
    group:string;
    useInOperation :string;
    description : string;
    responsible : string;
    developmentResponsible:string;
    basicUom: string;
    alternateUom: string;
    factor : string;
    orderMultipleBuom: string;
    moq: string;
    orderMultipleAuom: string;
    currency : string;
    price : string;
    purchasePriceQuantity : string;
    salesTax : string;
    exciseDuty : string;
    licence : string;
    property : string;
    isSaleItem : string;
    consumption : string;
    wastagePercentage : string;
    costGroup : string;
    usageRemarks: string;
    isActive: boolean;
    createdAt : Date;
    createdUser : string;
    updatedAt : Date;
    updatedUser : string;
    versionFlag : number;

    constructor(bomTrimId:number,
        trimCode :string,
        trim :string,
        genericCode: string,
        type: string,
        group:string,
        useInOperation :string,
        description : string,
        responsible : string,
        developmentResponsible:string,
        basicUom: string,
        alternateUom: string,
        factor : string,
        orderMultipleBuom: string,
        moq: string,
        orderMultipleAuom: string,
        currency : string,
        price : string,
        purchasePriceQuantity : string,
        salesTax : string,
        exciseDuty : string,
        licence : string,
        property : string,
        isSaleItem : string,
        consumption : string,
        wastagePercentage : string,
        costGroup : string,
        usageRemarks: string,
        isActive: boolean,
        createdAt : Date,
        createdUser : string,
        updatedAt : Date,
        updatedUser : string,
        versionFlag : number){
           this.trimCode = trimCode
           this.trim = trim
           this.genericCode = genericCode
           this.type = type
           this.group = group
           this.useInOperation = useInOperation
           this.description = description
           this.responsible = responsible
           this.developmentResponsible = developmentResponsible
           this.basicUom = basicUom
           this.alternateUom =   alternateUom
           this.factor = factor
           this.orderMultipleBuom = orderMultipleBuom
           this.moq = moq
           this.orderMultipleAuom = orderMultipleAuom
           this.currency = currency
           this.price = price
           this.purchasePriceQuantity = purchasePriceQuantity
           this.salesTax = salesTax
           this.exciseDuty = exciseDuty
           this.licence = licence
           this.property = property
           this.isSaleItem = isSaleItem
           this.consumption = consumption,
           this.wastagePercentage = wastagePercentage,
           this.costGroup = costGroup,
           this.usageRemarks = usageRemarks
           this.isActive = isActive
           this.createdAt = createdAt
           this.createdUser = createdUser
           this.updatedAt = updatedAt
           this.updatedUser = updatedUser
           this.versionFlag = versionFlag

    }


}
