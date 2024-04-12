import { PoChangeSizeModel } from "./pochange-qty.model";

export class TotalQuantityChangeModel {
    purchaseOrderNumber: string;
    poLineItemNumber: number;
    poAndLine: string;
    scheduleLineItemNumber:string;
    createdAt:string;
    item:string;
    factory:string;
    styleNumber: string;
    productCode: string;
    colorDesc: string;
    OGAC: string;
    GAC: string;
    destinationCountry: string;
    itemText: string;
    totalQuantity:string;
    sizeWiseData: PoChangeSizeModel[];
 
    constructor(purchaseOrderNumber: string,
        poLineItemNumber: number,
        poAndLine: string,
        scheduleLineItemNumber:string,
        createdAt:string,
        item:string,
        factory:string,
        styleNumber: string,
        productCode: string,
        colorDesc: string,
        OGAC: string,
        GAC: string,
        destinationCountry: string,
        itemText: string,
        
        totalQuantity:string,
        sizeWiseData: PoChangeSizeModel[] ) {

        this.item = item
        this.factory = factory
        this.createdAt = createdAt
        this.purchaseOrderNumber = purchaseOrderNumber
        this.poLineItemNumber = poLineItemNumber
        this.poAndLine = poAndLine
        this.styleNumber = styleNumber
        this.productCode = productCode
        this.colorDesc = colorDesc
        this.scheduleLineItemNumber = scheduleLineItemNumber
        
        this.totalQuantity =totalQuantity
        this.itemText = itemText
        this.destinationCountry = destinationCountry
        this.OGAC = OGAC
        this.GAC = GAC
        this.sizeWiseData = sizeWiseData
       
    };
}