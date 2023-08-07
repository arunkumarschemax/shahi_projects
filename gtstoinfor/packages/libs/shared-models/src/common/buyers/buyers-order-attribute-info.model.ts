export class BuyersOrderAttributeInfoModel{
    attributeId: number;
    attributeName: string;
    attributeValue: string;
    buyerOrderAttributeId: number;

    constructor(attributeId: number,attributeName: string,attributeValue: string,buyerOrderAttributeId:number){
        this.attributeId = attributeId;
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
        this.buyerOrderAttributeId = buyerOrderAttributeId
    }
}






