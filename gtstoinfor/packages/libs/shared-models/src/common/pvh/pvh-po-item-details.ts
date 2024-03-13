import { PvhPoItemVariant } from "./pvh-po-item-variant";

export class PvhPoItemDetails {

    poLine: string;
    material: string;
    totalUnitPrice:string
    originalDate:string
    transMode: string;
    plannedExFactoryDate:string;
    exFactoryDate:string;

   
    PvhpoItemVariantDetails: PvhPoItemVariant[]

}