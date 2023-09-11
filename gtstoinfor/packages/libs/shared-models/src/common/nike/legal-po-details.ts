import { PoItemDetailsDto } from "./legal-po-item-details";

export class LegalPoDetails{
    poNumber:string;
    buyerAddress : string;
    sellerAddress:String;
    poDocDate : string;
    seasonYear : string;
    divisionBuyGroup : string;
    currency : string;
    incoterms : string;
    factoryLocation : string;
    poItemDetails : PoItemDetailsDto[]
}