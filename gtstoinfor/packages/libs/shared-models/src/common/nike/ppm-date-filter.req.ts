export class PpmDateFilterRequest {
    lastModifedStartDate?: any;
    lastModifedEndtDate?: any;
    documentStartDate?: any;
    documentEndtDate?: any;
    productCode?: string;
    poandLine?: string;
    colorDesc?: string;
    categoryDesc?: string;
    destinationCountry?: string;
    plant?: string;
    item?: string;
    factory?: string;
    DPOMLineItemStatus?:string;
    poNumber?:string;
    docTypeCode?:string;
    poLineItemNumber?:string;
    styleNumber ?:string;
    planningSeasonCode?:string;
    planningSeasonYear?:string;
    geoCode?:string;


    

    constructor(
        lastModifedStartDate?: any ,lastModifedEndtDate?: any ,documentStartDate?: any,
        documentEndtDate?: any,productCode?: string,poandLine?: string,
        colorDesc?: string,categoryDesc?: string,destinationCountry?: string,
        plant?: string,item?: string,factory?: string,DPOMLineItemStatus?:string, poNumber?:string, docTypeCode?:string,
        poLineItemNumber?:string,
        styleNumber?:string,    planningSeasonCode?:string,
        planningSeasonYear?:string,
        geoCode?:string,

    ) {
        this.lastModifedStartDate = lastModifedStartDate;
        this.lastModifedEndtDate = lastModifedEndtDate;
        this.documentStartDate = documentStartDate;
        this.documentEndtDate = documentEndtDate;
        this.productCode = productCode;
        this.poandLine = poandLine;
        this.colorDesc = colorDesc;
        this.categoryDesc = categoryDesc;
        this.destinationCountry = destinationCountry;
        this.plant = plant;
        this.item = item;
        this.factory = factory;
        this.DPOMLineItemStatus = DPOMLineItemStatus;
        this.poNumber = poNumber;
        this.styleNumber=styleNumber;
        this.docTypeCode = docTypeCode;
        this.poLineItemNumber = poLineItemNumber
        this.styleNumber = styleNumber;
        this.planningSeasonCode = planningSeasonCode;
        this.planningSeasonYear = planningSeasonYear;
        this.geoCode= geoCode;
        

    }
}
