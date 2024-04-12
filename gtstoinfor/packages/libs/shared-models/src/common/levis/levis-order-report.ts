// import { LevisSizeWiseReportModel } from "./levis-size-report-data";

import { LevisSizeWiseReportModel } from "./levis-size-report-data";


// export class levisOrderReport {

//     id: number;
//     brand: string;
//     seasonCode: string;
//     division: string;
//     merchant: string;
//     itemNo: string;
//     factory: string;
//     region: string;
//     destinationCode: string;
//     destination: string;
//     styleNo: string;
//     poNumber: string;
//     unitPrice: string;
//     fabric: string;
//     description: string;
//     process: string;
//     color: string;
//     pcd: string;
//     ftyDiscussion: string;
//     originalFty: string;
//     gtnWeeks: string;
//     factoryDeliveryDate: string;
//     shipMode: string;
//     improvementDeferment: string;
//     plannedFty: string;
//     fOneDate: string;
//     shippedQuantity: string;
//     truckDate: string;
//     cartsClosedDate: string;
//     shortageExcess: string;
//     extraShort: string;
//     shippedQtyValue: string;
//     poHeader: string;
//     remarks: string;
//     deliveryAddress: string;
//     // transMode: string;
//     // currency: string;
//     // poLine: string;
//     // material: string;
//     // totalUnitPrice: string;
//     // originalDate: string;
//     quantity: string;
//     status:string;
//     sizeWiseData: LevisSizeWiseReportModel[];
//     // exFactoryDate?:string;


//     constructor(
//         // id: number,
//         // poNumber: string,
//         // deliveryAddress: string,
//         // transMode: string,
//         // currency: string,
//         // poLine: string,
//         // material: string,
//         // totalUnitPrice: string,
//         // originalDate: string,
//         // status:string,
//         // sizeWiseData: LevisSizeWiseReportModel[],
//         // exFactoryDate?:string,.

//         id: number,
//         brand: string,
//         seasonCode: string,
//         division: string,
//         merchant: string,
//         itemNo: string,
//         factory: string,
//         region: string,
//         destinationCode: string,
//         destination: string,
//         styleNo: string,
//         poNumber: string,
//         unitPrice: string,
//         fabric: string,
//         description: string,
//         process: string,
//         color: string,
//         pcd: string,
//         ftyDiscussion: string,
//         originalFty: string,
//         gtnWeeks: string,
//         factoryDeliveryDate: string,
//         shipMode: string,
//         improvementDeferment: string,
//         plannedFty: string,
//         fOneDate: string,
//         shippedQuantity: string,
//         truckDate: string,
//         cartsClosedDate: string,
//         shortageExcess: string,
//         extraShort: string,
//         shippedQtyValue: string,
//         poHeader: string,
//         remarks: string,
//         deliveryAddress: string,
//         // transMode: string,
//         // currency: string,
//         // poLine: string,
//         // material: string,
//         // totalUnitPrice: string,
//         // originalDate: string,
//         quantity:string,
//         status:string,
//         sizeWiseData: LevisSizeWiseReportModel[],
//         // exFactoryDate?:string,



//     ) {
//         // this.id = id
//         // this.poNumber = poNumber
//         // this.deliveryAddress = deliveryAddress
//         // this.transMode = transMode
//         // this .currency=currency
//         // this.poLine = poLine
//         // this.material = material
//         // this.totalUnitPrice = totalUnitPrice
//         // this.originalDate = originalDate
//         // this.status=status
//         // this.exFactoryDate=exFactoryDate
//         // this.sizeWiseData = sizeWiseData
//         // this.exFactoryDate=exFactoryDate

//         this.id = id
//         this.brand = brand
//         this.seasonCode = seasonCode
//         this.division = division
//         this.merchant = merchant
//         this.itemNo = itemNo
//         this.factory = factory
//         this.region = region
//         this.destinationCode = destinationCode
//         this.destination = destination
//         this.styleNo = styleNo
//         this.poNumber = poNumber
//         this.unitPrice = unitPrice
//         this.fabric = fabric
//         this.description = description
//         this.process = process
//         this.color = color
//         this.pcd = pcd
//         this.ftyDiscussion = ftyDiscussion
//         this.originalFty = originalFty
//         this.gtnWeeks = gtnWeeks
//         this.factoryDeliveryDate = factoryDeliveryDate
//         this.shipMode = shipMode
//         this.improvementDeferment = improvementDeferment
//         this.plannedFty = plannedFty
//         this.fOneDate = fOneDate
//         this.shippedQuantity = shippedQuantity
//         this.truckDate = truckDate
//         this.cartsClosedDate = cartsClosedDate
//         this.shortageExcess = shortageExcess
//         this.extraShort = extraShort
//         this.shippedQtyValue = shippedQtyValue
//         this.poHeader = poHeader
//         this.remarks = remarks
//         this.deliveryAddress = deliveryAddress
//         this.quantity = quantity
//         this.status=status
//         this.sizeWiseData = sizeWiseData


//     }
// }





export class levisOrderReportDataModel {

    id: number;
    poNumber: string;
    unitPrice: string;
    deliveryAddress: string;
    transMode: string;
    currency: string;
    poLine: string;
    material: string;
    totalUnitPrice: string;
    originalDate: string;
    status: string;
    sizeWiseData: LevisSizeWiseReportModel[];
    exFactoryDate?: string;
    color?: string;


    constructor(
        id: number,
        poNumber: string,
        unitPrice: string,
        deliveryAddress: string,
        transMode: string,
        currency: string,
        poLine: string,
        material: string,
        totalUnitPrice: string,
        originalDate: string,
        status: string,
        sizeWiseData: LevisSizeWiseReportModel[],
        exFactoryDate?: string,
        color?: string,



    ) {
        this.id = id
        this.poNumber = poNumber
        this.unitPrice = unitPrice
        this.deliveryAddress = deliveryAddress
        this.transMode = transMode
        this.currency = currency
        this.poLine = poLine
        this.material = material
        this.totalUnitPrice = totalUnitPrice
        this.originalDate = originalDate
        this.status = status
        this.sizeWiseData = sizeWiseData
        this.exFactoryDate = exFactoryDate
        this.color = color



    }
}


