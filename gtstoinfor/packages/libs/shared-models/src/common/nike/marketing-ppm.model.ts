import { FactoryReportSizeModel } from "./factory-repoort-factory-size-model";


export class MarketingModel {

    poLineItemNumber: number;
    lastModifiedDate: string;
    item: string;
    totalItemQty: string;
    factory: string;
    documentDate: string;
    purchaseOrderNumber: string;
    poAndLine: string;
    DPOMLineItemStatus: string;
    styleNumber: string;
    productCode: string;
    colorDesc: string;
    sizeWiseData: FactoryReportSizeModel[];
    

    constructor(
        poLineItemNumber: number,
    lastModifiedDate: string,
    item: string,
    totalItemQty: string,
    factory: string,
    documentDate: string,
    purchaseOrderNumber: string,
    poAndLine: string,
    DPOMLineItemStatus: string,
    styleNumber: string,
    productCode: string,
    colorDesc: string,
    sizeWiseData: FactoryReportSizeModel[]
       ) {

       this.poLineItemNumber = poLineItemNumber;
        this.lastModifiedDate = lastModifiedDate;
        this.item = item;
        this.totalItemQty = totalItemQty
        this.factory = factory
        this.documentDate = documentDate
        this.purchaseOrderNumber = purchaseOrderNumber
        this.poAndLine = poAndLine;
        this.DPOMLineItemStatus = DPOMLineItemStatus
        this.styleNumber = styleNumber
        this.productCode = productCode
        this.colorDesc = colorDesc
       this.sizeWiseData = sizeWiseData
        
    }

}