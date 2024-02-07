import { BomReportSizeModel } from "./bom-size-modal.req";

export class BomReportModel {
     id?:number;
    purchaseOrderNumber ?: string;
    poAndLine ?: string;
    styleNumber ?: string;
    destinationCountryCode ?: string;
    destinationCountry ?: string;
    planningSeasonCode ?: string;
    planningSeasonYear ?: string;    
    geoCode ?: string;
    totalItemQty ?: string;
 
    sizeWiseData ?: BomReportSizeModel[];
    genderAgeDesc?: string;
    ogac?:string

    constructor(id:number, purchaseOrderNumber ?: string,poAndLine ?: string, styleNumber ?: string,destinationCountryCode ?: string, destinationCountry ?: string, planningSeasonCode ?: string, planningSeasonYear ?: string,   geoCode ?: string, totalItemQty ?: string, 
         sizeWiseData ?: BomReportSizeModel[],genderAgeDesc?: string,ogac?:string
    ) {
        this.id = id
        this.purchaseOrderNumber = purchaseOrderNumber
        this.poAndLine = poAndLine
        this.styleNumber = styleNumber
        this.destinationCountryCode = destinationCountryCode
        this.destinationCountry = destinationCountry
        this.planningSeasonCode = planningSeasonCode
        this.planningSeasonYear = planningSeasonYear
        this.geoCode = geoCode
        this.totalItemQty = totalItemQty
       
        this.sizeWiseData = sizeWiseData
        this.genderAgeDesc = genderAgeDesc
        this.ogac=ogac
       };
}