import { LevisSizeWiseModel } from "./levis-size-wise data";


export class levisOrderDataModel {

    id: number;
    poNumber: string;
    deliveryAddress: string;
    transMode: string;
    currency: string;
    poLine: string;
    material: string;
    totalUnitPrice: string;
    originalDate: string;
    sizeWiseData: LevisSizeWiseModel[]


    constructor(
        id: number,
        poNumber: string,
        deliveryAddress: string,
        transMode: string,
        currency: string,
        poLine: string,
        material: string,
        totalUnitPrice: string,
        originalDate: string,
        sizeWiseData: LevisSizeWiseModel[],



    ) {
        this.id = id
        this.poNumber = poNumber
        this.deliveryAddress = deliveryAddress
        this.transMode = transMode
        this .currency=currency
        this.poLine = poLine
        this.material = material
        this.totalUnitPrice = totalUnitPrice
        this.originalDate = originalDate
        this.sizeWiseData = sizeWiseData



    }
}


