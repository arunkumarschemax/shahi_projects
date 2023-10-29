import { SKUListDto } from "./skulist-dto";

export class SKUDTO{
    itemNo:string;
    itemCode:number;
 sku:SKUListDto[];
 constructor(itemNo:string,itemCode:number,sku:SKUListDto[]){
    this.itemNo=itemNo;
    this.itemCode=itemCode;
    this.sku=sku
 }
}