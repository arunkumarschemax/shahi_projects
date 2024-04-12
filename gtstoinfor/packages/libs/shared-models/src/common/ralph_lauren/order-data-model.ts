import { OrderSizeWiseModel } from "@project-management-system/shared-models";

export class OrderDataModel {

    id: number;

    poNumber: string;
  
    poItem: number;
  
    shipToAddress: string;
  
    agent: string;
  
    purchaseGroup: string;
  
    supplier: string;
  
    revisionNo: number;
  
    poUploadDate: string;
  
    status: string;
  
    division: string;
  
    shipTo: string;
  
    seasonCode: string;
  
    boardCode: string;
  
    style: string;
  
    materialNo: string;
  
    rlStyleNo: string;
  
    color: string;
  
    size: string;
  
    totalQty: number;
  
    shipDate: string;
  
    shipMode: string;
  
    msrpPrice: string;
  
    msrpCurrency: string;
  
    csPrice: string;
  
    csCurrency: string;
  
    amount: string;
  
    totalAmount: string;
  
    price: string;
  
    currency: string;
  
    quantity: number;
  
    upcEan: string;
    sizeWiseData: OrderSizeWiseModel[]

    constructor(
        
    id: number,
    poNumber: string,
     poItem: number,
    shipToAddress: string,
     agent: string,
     purchaseGroup: string,
     supplier: string,
    revisionNo: number,
    poUploadDate: string,
    status: string,
    division: string,
    shipTo: string,
    seasonCode: string,
    boardCode: string,
    style: string,
    materialNo: string,
    rlStyleNo: string,
    color: string,
    size: string,
    totalQty: number,
    shipDate: string,
    shipMode: string,
    msrpPrice: string,
    msrpCurrency: string,
    csPrice: string,
    csCurrency: string,
    amount: string,
    totalAmount: string,
    price: string,
    currency: string,
    quantity: number,
   upcEan: string,
  sizeWiseData: OrderSizeWiseModel[]
        ) {
            this.id = id
            this.poNumber = poNumber
            this.poItem = poItem
            this.shipToAddress = shipToAddress
            this.agent = agent
            this.purchaseGroup = purchaseGroup
            this.supplier = supplier
            this.revisionNo = revisionNo 
            this.poUploadDate = poUploadDate  
            this.status = status
            this.poUploadDate = poUploadDate
            this.division = division
            this.shipTo = shipTo
            this.seasonCode = seasonCode
            this.division = division
            this.boardCode = boardCode
            this.style = style
            this.materialNo = materialNo
            this.rlStyleNo = rlStyleNo
            this.color = color
            this.size = size
            this.totalQty = totalQty
            this.shipDate = shipDate
            this.shipMode = shipMode
            this.msrpPrice = msrpPrice
            this.msrpCurrency = msrpCurrency
            this.csPrice = csPrice
            this.csCurrency = csCurrency
            this.amount = amount
            this.totalAmount = totalAmount
            this.price = price
            this.currency = currency
            this.quantity = quantity
            this.upcEan = upcEan
            this.sizeWiseData = sizeWiseData
        }
}


