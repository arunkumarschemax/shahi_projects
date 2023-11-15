
export class bomRequest {
    
    itemTypeId : number;
    pchId : number;
    facilityId : number;
    trimCode :string;
    trim : string;
    genericCode: string;
    typeId : number;
    productGroupId: number;
    useInOperationId : number;
    description : string;
    responsible : string;
    developmentResponsible:string;
    basicUomId : number;
    alternateUomId : number;
    factor : string;
    orderMultipleBuom: string;
    moq: string;
    orderMultipleAuom: string;
    currencyId : number;
    price : number;
    purchasePriceQuantity : number;
    salesTax : string;
    exciseDuty : string;
    licenceId : number;
    property : string;
    isSaleItem : string;
    consumption : number;
    wastagePercentage : number;
    costGroup : string;
    usageRemarks: string;
    taxPercentage:number;
    totalPrice:number
    isImportedItem:string

  

    constructor(
        itemTypeId : number,
         pchId : number,
        facilityId : number,
        trimCode :string,
        trim : string,
        genericCode: string,
        typeId : number,
        productGroupId: number,
        useInOperationId : number,
        description : string,
        responsible : string,
        developmentResponsible:string,
        basicUomId : number,
        alternateUomId : number,
        factor : string,
        orderMultipleBuom: string,
        moq: string,
        orderMultipleAuom: string,
        currencyId : number,
        price : number,
        purchasePriceQuantity : number,
        salesTax : string,
        exciseDuty : string,
        licenceId : number,
        property : string,
        isSaleItem : string,
        consumption : number,
        wastagePercentage : number,
        costGroup : string,
        usageRemarks: string,
        taxPercentage:number,
        totalPrice : number,
        isImportedItem:string
       ){  
           this.itemTypeId = itemTypeId
           this.pchId = pchId
           this.facilityId = facilityId
           this.trimCode = trimCode
           this.trim = trim
           this.genericCode = genericCode
           this.typeId = typeId
           this.productGroupId = productGroupId
           this.useInOperationId = useInOperationId
           this.description = description
           this.responsible = responsible
           this.developmentResponsible = developmentResponsible
           this.basicUomId = basicUomId
           this.alternateUomId =   alternateUomId
           this.factor = factor
           this.orderMultipleBuom = orderMultipleBuom
           this.moq = moq
           this.orderMultipleAuom = orderMultipleAuom
           this.currencyId = currencyId
           this.price = price
           this.purchasePriceQuantity = purchasePriceQuantity
           this.salesTax = salesTax
           this.exciseDuty = exciseDuty
           this.licenceId = licenceId
           this.property = property
           this.isSaleItem = isSaleItem
           this.consumption = consumption,
           this.wastagePercentage = wastagePercentage,
           this.costGroup = costGroup,
           this.usageRemarks = usageRemarks
           this.taxPercentage  = taxPercentage
           this.totalPrice = totalPrice
           this.isImportedItem = isImportedItem
        
    

    }


}
