import { BuyersGeneralAttributeInfo } from "./buyers-general-attribute-info.dto";

export class BuyersGeneralAttributeDto {
    buyerGeneralAttributeId: number;
    vendorId : number;
    attributeInfo: BuyersGeneralAttributeInfo[]

    constructor(buyerGeneralAttributeId: number,vendorId : number,attributeInfo: BuyersGeneralAttributeInfo[]){
        this.buyerGeneralAttributeId = buyerGeneralAttributeId;
        this.vendorId = vendorId;
        this.attributeInfo = attributeInfo;
    }

}