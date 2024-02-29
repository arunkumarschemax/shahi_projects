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
    consumption : number
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
    qty: number;
    size: string;
}

export class BomDataForStyleAndSeasonModel {
    styleId: number;
    bomId: number;
    itemName: string;
    description: string;
    imCode: string;
    itemType: string;
    itemId : number
    constructor(data?: Partial<BomProposalDataModel>) {
        Object.assign(this, data);
    }
}

export class BomProposalModel{
    imCode : string
    item : string 
    description : string
    totalQty : number;
    destination : string;
    poNumber : string;
    style : string
}

export class BomExcelreq {
    style?: string;
    bomId?: number;
    itemName?: string;
    description?: string;
    imCode?: string;
    itemType?: string;
    itemId?: number;
    pbId?:number
}