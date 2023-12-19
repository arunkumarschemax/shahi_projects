export class SeasonWiseRequest {
  itemCode?: number;
  itemName?: string;
  year: number;
  season: string;
  qtyLocation: string;
  constructor(
    itemCode?: number,
    itemName?: string,
    year?: number,
    season?: string,
    qtyLocation?: string
  ) {
    this.itemCode = itemCode;
    this.itemName = itemName;
    this.year = year;
    this.season = season;
    this.qtyLocation = qtyLocation;
  }
}


export class MonthItemData{
  monthName:string
  totalQuantity:number
  constructor(
    monthName:string,
    totalQuantity:number
  ){
    this.monthName=monthName
    this.totalQuantity=totalQuantity
  }
}
export class sesaonWisereportModel{
  itemName?: string;
  year?: number;
  season?: string;
  MonthItemData?:MonthItemData[]
  constructor(
    itemName?: string,
    year?: number,
    season?: string,
    MonthItemData?:MonthItemData[]
  ){
    this.itemName=itemName
    this.year=year
    this.season=season
    this.MonthItemData=MonthItemData
  }
}



