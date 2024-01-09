import { MonthWiseDto, NewMonthWiseDto } from "./month-wise.dto";

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



 export class NewitemDataDto{
    itemName:string
    latestDate?:any
    previousDate?:any
    monthWiseData?:NewMonthWiseDto[]
    constructor(
        itemName:string,
        monthWiseData?:NewMonthWiseDto[],
        latestDate?:any,
        previousDate?:any
    ){
        this.itemName=itemName
        this.monthWiseData=monthWiseData
        this.latestDate=latestDate
        this.previousDate=previousDate
    }

 }



