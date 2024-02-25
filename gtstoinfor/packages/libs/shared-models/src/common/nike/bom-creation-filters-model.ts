export class BomCreationFiltersReq{
    style : string[]
    item : string[]
    geoCode: string []
    fromDate : any
    toDate : any
    poLine : string []
}

export class UpdatedSizes {
    poLine : string;
    size : string;
    qty : number;
}

export class UpdatedConsumptions{
    itemId : number;
    wastage : number;
    moq : number;
    cosumption : number
}

export class BomGenerationReq {
    poLine : string[]
    updatedSizes : UpdatedSizes[]
    updatedConsumptions: UpdatedConsumptions[]

}

export class PoDataForBomGenerationModel {
    id: number;
    poNumber: string;
    poLineNo: string;
    scheduleLineItemNo: string;
    styleNumber: string;
    color: string;
    destination: string;
    geoCode: string;
    plant: string;
    season: string;
    year: string;
    qty: string;
    size: string;
}

export class BomDataForStyleAndSeasonModel {
    styleId: number;
    bomId: number;
    itemName: string;
    description: string;
    imCode: string;
    itemType: string;
    styleComboId: number;
    combination: string;
    primaryColor: string;
    secondaryColor: string;
    logoColor: string;
    color: string;
}