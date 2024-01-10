import { HbSizeWiseModel } from "./hb-size-wise data";

export class HbOrderDataModel {

    id: number;
    custPo: string;
    style: string;
    color: string;
    size: string;
    exitFactoryDate: string;
    shipToAdd: number;
    sizeWiseData: HbSizeWiseModel[]
    quantity?:number
    unitPrice?:string

    constructor(
        id: number,
        custPo: string,
        style: string,
        color: string,
        size: string,
        exitFactoryDate: string,
        shipToAdd: number,
        sizeWiseData: HbSizeWiseModel[],
        quantity?:number,
        unitPrice?:string,
        
    ) {
        this.id = id
        this.custPo = custPo
        this.style = style
        this.color = color
        this.size = size
        this.exitFactoryDate = exitFactoryDate
        this.shipToAdd = shipToAdd
        this.sizeWiseData = sizeWiseData
        this.quantity = quantity
        this.unitPrice = unitPrice
       
    }
}


