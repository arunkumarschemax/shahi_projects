import { PvhSizeWiseModel } from "./pvh-size-wise-data";


export class PvhOrderDataModel {

    id: number;
    poNumber: string;
    deliveryAddress: string;
    transMode: string;
    currency: string;
    poLine: string;
    material: string;
    totalUnitPrice: string;
    originalDate: string;
    status:string;
    deliverDate:string;
    buyerName:string;
    sizeWiseData: PvhSizeWiseModel[];
   
   


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
        status:string,
        deliverDate:string,
        buyerName:string,
        sizeWiseData: PvhSizeWiseModel[],
       



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
        this.status=status
        this.deliverDate=deliverDate
        this.buyerName=buyerName
        this.sizeWiseData = sizeWiseData
       



    }
}


