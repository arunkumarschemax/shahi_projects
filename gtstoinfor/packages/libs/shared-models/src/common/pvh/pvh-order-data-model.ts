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
    sizeWiseData: PvhSizeWiseModel[];
    exFactoryDate?:string;


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
        sizeWiseData: PvhSizeWiseModel[],
        exFactoryDate?:string,



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
        this.exFactoryDate=exFactoryDate
        this.sizeWiseData = sizeWiseData
        this.exFactoryDate=exFactoryDate



    }
}


