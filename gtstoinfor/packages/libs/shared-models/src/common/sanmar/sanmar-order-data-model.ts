import { SanmarSizeWiseModel } from "./sanmar-size-wise data";


export class sanmarOrderDataModel {

    id: number;
    buyerPo: string;
    poDate:string;
    style: string;
    color: string;
    size: string;
    deliveryDate: string;
    shipToAdd: number;
    buyerAddress:string;
     sizeWiseData: SanmarSizeWiseModel[]
    quantity?:number
    unitPrice?:string
    status?:string
   

    constructor(
        id: number,
        buyerPo: string,
        poDate:string,
        style: string,
        color: string,
        size: string,
        deliveryDate: string,
        shipToAdd: number,
        buyerAddress:string,
        sizeWiseData: SanmarSizeWiseModel[],
        quantity?:number,
        unitPrice?:string,
        status?:string,
    

        
    ) {
        this.id = id
        this.buyerPo = buyerPo
        this.poDate = poDate
        this.style = style
        this.color = color
        this.size = size
        this.deliveryDate = deliveryDate
        this.shipToAdd = shipToAdd
        this.buyerAddress = buyerAddress
        this.sizeWiseData = sizeWiseData
        this.quantity = quantity
        this.unitPrice = unitPrice
        this. status=status
  
       
       
    }
}


