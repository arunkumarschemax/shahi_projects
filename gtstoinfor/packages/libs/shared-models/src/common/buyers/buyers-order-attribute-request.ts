import { BuyersOrderAttributeInfoModel } from "./buyers-order-attribute-info.model";

export class BuyersOrderAttributeRequest {
    buyerOrderAttributeId: number;
    buyerId : number;
    attributeInfo: BuyersOrderAttributeInfoModel[];
    createdUser: string;
    updatedUser?: string;

    constructor(buyerOrderAttributeId: number,buyerId : number,attributeInfo: BuyersOrderAttributeInfoModel[],createdUser: string,updatedUser?: string){
        this.buyerOrderAttributeId = buyerOrderAttributeId;
        this.buyerId = buyerId;
        this.attributeInfo = attributeInfo;
        this.createdUser = createdUser;
        this.updatedUser =updatedUser;
    }
}