export class BomCreationFiltersReq {
    style: string[]
    item: string[]
    geoCode: string[]
    fromDate: any
    toDate: any
    planningSeasonCode: string
    planningSeasonYear: string
    poLine: string[]
    productCode: string
}

export class UpdatedSizes {
    poLine: string;
    size: string;
    qty: number;
}

export class UpdatedConsumptions {
    itemId: number;
    wastage: number;
    moq: number;
    consumption: number
}

export class BomGenerationReq {
    poLine: string[]
    updatedSizes: UpdatedSizes[]
    updatedConsumptions: UpdatedConsumptions[]

}

export class BomProposalReq {
    poLine: string[]
    itemId: number[]
    trimName?: string
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
    gender: string
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
    itemNo: string
    itemId: number
    gender: string
    poNumber: string
    ogacDate: string
    shipToNumber: string
    combination?: string
    primaryColor?: string
    secondaryColor?: string
    itemColor?: string
    productCode?: string;
    bomId?: number;
    styleCombo?: number;
    totalGarmentQty?: number;
    attribute?: string
    attributeValue?: string
    bQty?: number
    fabricContent?: string
    fabricCode?: string
    fabricCombination?: string
    fit?: string
    sequence?: number
    constructor(data?: Partial<BomProposalDataModel>) {
        Object.assign(this, data);
    }

}

export class BomProposalModel {
    imCode: string
    item: string
    description: string
    totalQty: number;
    destination: string;
    poNumber: string;
    style: string
}


export class BomExcelreq {
    style?: string;
    bomId?: number;
    itemName?: string;
    description?: string;
    imCode?: string;
    itemType?: string;
    itemId?: number;
    pbId?: number
    geoCode: string[]

}


export class UpdateBomITemNoFilters {
    styleNo: string[]
    fromDate: any
    toDate: any
    poLine: string[]
    planningSeasonCode: string;
    planningSeasonYear: string
}
