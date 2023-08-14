import { BuyersOrderAttributeInfoModel } from "./buyers-order-attribute-info.model";

export class BuyersOrderAttributeModel {
    buyerOrderAttributeId: number;
    buyerId : number;
    // attributeInfo: BuyersOrderAttributeInfoModel[]
    attributeId: number;
    attributeName: string;
    attributeValue:string;
    isActive: boolean;
    versionFlag: number;

    constructor(buyerOrderAttributeId: number,buyerId : number,attributeId: number,attributeName: string,attributeValue:string,isActive: boolean,versionFlag:number){
        this.buyerOrderAttributeId = buyerOrderAttributeId;
        this.buyerId = buyerId;
        this.attributeId = attributeId;
        this.attributeName = attributeName ;
        this.attributeValue = attributeValue;
        this.isActive = isActive;
        this.versionFlag = versionFlag
    }

}





