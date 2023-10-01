import { MonthWiseDto } from "./month-wise.dto";

export class ItemDataDto {
    itemName: string;
    latestDate?: any;
    PreviousDate?: any
    monthWiseData:MonthWiseDto[]
     constructor(itemName:string,monthWiseData:MonthWiseDto[],latestDate?: any,PreviousDate?: any) {
         this.itemName = itemName
         this.monthWiseData = monthWiseData
         this.PreviousDate = PreviousDate
         this.latestDate = latestDate
     };
 }