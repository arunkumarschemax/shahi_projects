import { BuyersGeneralAttributeInfoModel } from "./buyers-general-attribute-info.model";

export class BuyersGeneralAttributeModel {
    buyerGeneralAttributeId: number;
    buyerId : number;
    // attributeInfo: BuyersGeneralAttributeInfoModel[];
    attributeId: number;
    attributeName: string;
    attributeValue:string;
    isActive: boolean;
    versionFalg: number;

    constructor(buyerGeneralAttributeId: number,buyerId : number,attributeId: number,attributeName: string,attributeValue:string,isActive: boolean,versionFalg: number){
        this.buyerGeneralAttributeId = buyerGeneralAttributeId;
        this.buyerId = buyerId;
        this.attributeId = attributeId;
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
        this.isActive = isActive;
        this.versionFalg = versionFalg;
    }
}