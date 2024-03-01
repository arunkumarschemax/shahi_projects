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

export class BomProposalReq {
    poLine: string[]
    itemId: number[]
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
    itemId?: number
    styleComboId: number;
    combination: string;
    primaryColor: string;
    secondaryColor: string;
    logoColor: string;
    color: string;
}


export class BomProposalDataModel {
    id: number;
    poQty: number;
    bomQty: number;
    consumption: number;
    wastage: number;
    moq: number;
    description: string;
    imCode: string;
    use: string;
    styleNumber: string; // Add styleNumber property
    color: string; // Add color property
    destination: string; // Add destination property
    geoCode: string; // Add geoCode property
    plant: string; // Add plant property
    season: string; // Add season property
    year: number; // Add year property
    size: string; // Add size property
    itemNo : string
    itemId : number
    gender : string
    poNumber : string
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
    geoCode: string []

}
