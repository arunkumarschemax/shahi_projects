import { EddieSizeWiseModel } from "./eddie-size-wise data";


export class eddieOrderDataModel {

    id: number;
    poNumber: string;
    poDate:string;
    incoterm:string;
    style: string;
    color: string;
   
    deliveryDate: string;
    shipToAdd: number;
    buyerAddress:string;
    manufacture:string;
    shipmentMode:string;
    paymentTerms:string;
     poLine:string;
     buyerItem:string;
     shortDescription:string;
     currency:string;
   
    retailPrice:string;
    status:string;
    exFactoryDate:string;
    sizeWiseData: EddieSizeWiseModel[]
   

    constructor(
        id: number,
        poNumber: string,
        poDate:string,
        incoterm:string,
        style: string,
        color: string,
      
        deliveryDate: string,
        shipToAdd: number,
        buyerAddress:string,
        manufacture:string,
        shipmentMode:string,
        paymentTerms:string,
        poLine:string,
        buyerItem:string,
        shortDescription:string,
        currency:string,
       
        retailPrice:string,
        status:string,
        exFactoryDate:string,
        sizeWiseData: EddieSizeWiseModel[],
    

        
    ) {
        this.id = id
        this.poNumber = poNumber
        this.poDate = poDate
        this.incoterm=incoterm
        this.style = style
        this.color = color
      
        this.deliveryDate = deliveryDate
        this.shipToAdd = shipToAdd
        this.buyerAddress = buyerAddress
        this.manufacture=manufacture
        this.shipmentMode=shipmentMode
        this.paymentTerms=paymentTerms
        this.poLine=poLine
        this.buyerItem=buyerItem
        this.shortDescription=shortDescription
        this.currency=currency
       
        this.retailPrice = retailPrice
        this. status=status
        this.exFactoryDate=exFactoryDate
        this.sizeWiseData = sizeWiseData
  
       
       
    }
}


