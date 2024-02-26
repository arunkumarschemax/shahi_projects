export class BomGenerationDto {
    id?: number;
    purchaseOrderNumber?: string;
    poAndLine?: string;
    styleNumber?: string;
    destinationCountryCode?: string;
    destinationCountry?: string;
    planningSeasonCode?: string;
    planningSeasonYear?: string;
    geoCode?: string;
    totalItemQty?: string;
    // sizeWiseData?: BomReportSizeModel[];
    genderAgeDesc?: string;
    ogac?: string
    itemNo?: string
    plantCode?: string
}

export const bomGenerationColumnsMapping= {
    poNumber : 'PO Number',
    poLineItemNumber : 'PO Line',
    poLine : 'PO + Line',
    styleNumber : 'Style',
    planningSeasonCode : 'Planning Season Code',
    planningSeasonYear : 'Planning Season Year',
    geoCode : 'Geo code',
    destinationCountryCode : 'Destination Code',
    genderAgeDesc : 'Gender Age Desc',
    destinationCountry : 'Destination',
    item : 'Item',
    plant : 'Plant'

}