import { MonthWiseDto } from "./month-wise.dto";

export class ItemDataDto {
    itemName: string;
    monthWiseData:MonthWiseDto[]
     constructor(itemName:string,monthWiseData:MonthWiseDto[]) {
         this.itemName = itemName
         this.monthWiseData = monthWiseData
     };
 }