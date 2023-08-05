import { BuyersGeneralAttributeInfoModel } from "./buyers-general-attribute-info.model";

export class BuyersGeneralAttributeModel {
    buyerGeneralAttributeId: number;
    buyerId : number;
    attributeInfo: BuyersGeneralAttributeInfoModel[];
    isActive: boolean;
    versionFalg: number;

    constructor(buyerGeneralAttributeId: number,buyerId : number,attributeInfo: BuyersGeneralAttributeInfoModel[],isActive: boolean,versionFalg: number){
        this.buyerGeneralAttributeId = buyerGeneralAttributeId;
        this.buyerId = buyerId;
        this.attributeInfo = attributeInfo;
        this.isActive = isActive;
        this.versionFalg = versionFalg;
    }
}