import { BuyersGeneralAttributeInfoModel } from "./buyers-general-attribute-info.model";

export class BuyersGeneralAttributeRequest {
    buyerGeneralAttributeId: number;
    buyerId : number;
    attributeInfo: BuyersGeneralAttributeInfoModel[];
    createdUser: string;
    updatedUser?: string;

    constructor(buyerGeneralAttributeId: number,buyerId : number,attributeInfo: BuyersGeneralAttributeInfoModel[],createdUser: string,updatedUser?: string){
        this.buyerGeneralAttributeId = buyerGeneralAttributeId;
        this.buyerId = buyerId;
        this.attributeInfo = attributeInfo;
        this.createdUser = createdUser;
        this.updatedUser =updatedUser;
    }
}