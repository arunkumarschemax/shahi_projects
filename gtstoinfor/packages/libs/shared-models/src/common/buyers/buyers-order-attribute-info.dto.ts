export class BuyersOrderAttributeInfo{
    attributeId: number;
    attributeName: string;
    attributeValue: string;

    constructor(attributeId: number,attributeName: string,attributeValue: string){
        this.attributeId = attributeId;
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
    }
}