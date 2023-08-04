import { BuyersOrderAttributeInfo } from "./buyers-order-attribute-info.dto";

export class BuyersOrderAttributeDto {
    buyerOrderAttributeId: number;
    buyerId : number;
    attributeInfo: BuyersOrderAttributeInfo[]

    constructor(buyerOrderAttributeId: number,buyerId : number,attributeInfo: BuyersOrderAttributeInfo[]){
        this.buyerOrderAttributeId = buyerOrderAttributeId;
        this.buyerId = buyerId;
        this.attributeInfo = attributeInfo;
    }

}