export class MaterialIssueReportsDto {
    id: number;
    consumptionCode: string;
    m3StyleNo: string;
    sampleType: string;
    pch: string;
    location: string;
    style: string;
    buyer: string;
    issuedDate: string;
    trimData: TrimDataDto[];
    fabricData: FabricDataDto[];
    constructor(
        id: number, 
        consumptionCode: string,
        m3StyleNo: string,
        sampleType: string,
        pch: string,
        location: string,
        style: string,
        buyer: string,
        issuedDate: string,
        trimData: TrimDataDto[],
        fabricData: FabricDataDto[],
    ) {
        this.consumptionCode = consumptionCode
        this.m3StyleNo = m3StyleNo
        this.sampleType = sampleType
        this.pch = pch
        this.location = location
        this.style = style
        this.buyer = buyer
        this.issuedDate = issuedDate
        this.trimData = trimData
        this.fabricData = fabricData
        this.id = id;
    }
}


export class TrimDataDto {
    productName: string;
    itemCode: string;
    color: string;
    consumption: string;
    issuedQuantity: string;
    status: string;
    constructor(productName: string,
        itemCode: string,
        color: string,
        consumption: string,
        issuedQuantity: string,
        status: string
    ) {
        this.productName = productName
        this.itemCode = itemCode
        this.color = color
        this.consumption = consumption
        this.issuedQuantity = issuedQuantity
        this.status = status

    }
}

export class FabricDataDto {
    productName: string;
    itemCode: string;
    color: string;
    consumption: string;
    issuedQuantity: string;
    status: string;
    constructor(
        productName: string,
        itemCode: string,
        color: string,
        consumption: string,
        issuedQuantity: string,
        status: string,
    ) {
        this.productName = productName;
        this.itemCode = itemCode;
        this.color = color;
        this.consumption = consumption;
        this.issuedQuantity = issuedQuantity;
        this.status = status;
    }
}