export class BuyersGeneralAttributeInfoModel{
    attributeId: number;
    attributeName: string;
    attributeValue: string;
    buyerGeneralAttributeId: number;

    constructor(attributeId: number,attributeName: string,attributeValue: string,buyerGeneralAttributeId: number){
        this.attributeId = attributeId;
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
        this.buyerGeneralAttributeId = buyerGeneralAttributeId
    }
}