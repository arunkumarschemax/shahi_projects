import { SKUListDto } from "./skulist-dto";

export class SKUDTO{
    itemNo:string;
    itemNoId:number;
 sku:SKUListDto[];
 constructor(itemNo:string,itemNoId:number,sku:SKUListDto[]){
    this.itemNo=itemNo;
    this.itemNoId=itemNoId;
    this.sku=sku
 }
}